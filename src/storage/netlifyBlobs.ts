import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { getFilePrefix } from '@payloadcms/plugin-cloud-storage/utilities'
import { getStore } from '@netlify/blobs'
import type { Plugin } from 'payload'

type Options = {
  /** Collection slugs to store in Netlify Blobs. */
  collections: Record<string, true>
  /** Name of the Netlify Blobs store. */
  storeName?: string
  /** Browser/CDN cache lifetime for served files, in seconds. */
  cacheControlMaxAge?: number
}

// Inside Netlify's runtime the site ID and token are injected automatically. Elsewhere
// (local dev, CI) both NETLIFY_SITE_ID and NETLIFY_BLOBS_TOKEN must be provided.
const hasExplicitCredentials = () =>
  Boolean(process.env.NETLIFY_SITE_ID && process.env.NETLIFY_BLOBS_TOKEN)

export const isNetlifyBlobsAvailable = () =>
  process.env.NETLIFY === 'true' || hasExplicitCredentials()

const keyFor = (collectionPrefix: string, docPrefix: string | undefined, filename: string) =>
  [collectionPrefix, docPrefix, filename].filter(Boolean).join('/')

const createAdapter =
  ({ storeName = 'media', cacheControlMaxAge = 60 * 60 * 24 * 365 }: Options): Adapter =>
  ({ collection, prefix = '' }): GeneratedAdapter => {
    const store = () =>
      getStore(
        hasExplicitCredentials()
          ? {
              name: storeName,
              siteID: process.env.NETLIFY_SITE_ID!,
              token: process.env.NETLIFY_BLOBS_TOKEN!,
            }
          : { name: storeName },
      )

    return {
      name: 'netlify-blobs',

      // No public URL: files are served through Payload's staticHandler (/api/<collection>/file/<name>),
      // so the collection's access control still applies.

      handleUpload: async ({ data, file }) => {
        const buffer = file.buffer.buffer.slice(
          file.buffer.byteOffset,
          file.buffer.byteOffset + file.buffer.byteLength,
        ) as ArrayBuffer
        await store().set(keyFor(prefix, data.prefix, file.filename), buffer, {
          metadata: { contentType: file.mimeType },
        })
        return data
      },

      handleDelete: async ({ doc, filename }) => {
        await store().delete(keyFor(prefix, doc.prefix, filename))
      },

      staticHandler: async (req, { headers, params: { clientUploadContext, filename, prefix: prefixQueryParam } }) => {
        try {
          const docPrefix = await getFilePrefix({
            clientUploadContext,
            collection,
            filename,
            prefixQueryParam,
            req,
          })
          const entry = await store().getWithMetadata(keyFor(prefix, docPrefix, filename), {
            type: 'stream',
          })
          if (!entry || !entry.data) {
            return new Response(null, { status: 404, statusText: 'Not Found' })
          }

          const etag = `"${entry.etag}"`
          const responseHeaders = new Headers(headers)
          responseHeaders.set(
            'Content-Type',
            (entry.metadata.contentType as string | undefined) ?? 'application/octet-stream',
          )
          responseHeaders.set('Cache-Control', `public, max-age=${cacheControlMaxAge}`)
          responseHeaders.set('ETag', etag)
          if (entry.metadata.contentType === 'image/svg+xml') {
            responseHeaders.set('Content-Security-Policy', "script-src 'none'")
          }

          if (req.headers.get('if-none-match') === etag) {
            void entry.data.cancel()
            return new Response(null, { status: 304, headers: responseHeaders })
          }
          return new Response(entry.data, { status: 200, headers: responseHeaders })
        } catch (err) {
          req.payload.logger.error({ err, msg: 'Unexpected error in Netlify Blobs staticHandler' })
          return new Response('Internal Server Error', { status: 500 })
        }
      },
    }
  }

export const netlifyBlobsStorage =
  (options: Options & { enabled?: boolean }): Plugin =>
  (incomingConfig) => {
    if (options.enabled === false) return incomingConfig

    const adapter = createAdapter(options)
    return cloudStoragePlugin({
      collections: Object.fromEntries(
        Object.keys(options.collections).map((slug) => [slug, { adapter }]),
      ),
    })(incomingConfig)
  }
