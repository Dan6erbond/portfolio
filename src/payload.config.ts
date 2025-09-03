import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Code, CodeTabs } from './blocks/Code'

import { About } from './globals/About'
import { BlogPost } from './collections/BlogPost'
import { Contact } from './globals/Contact'
import { Experience } from './collections/Experience'
import { Media } from './collections/Media'
import { Project } from './collections/Project'
import { Users } from './collections/Users'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      collections: ['blog-posts'],
      url: ({ data, collectionConfig }) =>
        collectionConfig?.slug === 'blog-posts'
          ? `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/blog/draft?secret=${process.env.DRAFT_MODE_SECRET}&slug=${data.slug}`
          : '',
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 640,
          height: 1490,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 576,
        },
        {
          label: 'Laptop',
          name: 'laptop',
          width: 1024,
          height: 1640,
        },
      ],
    },
  },
  blocks: [Code, CodeTabs],
  globals: [About, Contact],
  collections: [Users, Media, Experience, Project, BlogPost],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      BlocksFeature({
        blocks: [Code, CodeTabs],
        inlineBlocks: [],
      }),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin({}),
    vercelBlobStorage({
      enabled: process.env.BLOB_READ_WRITE_TOKEN != null,
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
