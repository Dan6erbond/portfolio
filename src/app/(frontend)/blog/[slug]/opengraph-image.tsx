/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
import { cn } from '../../../../lib/utils'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { getPayload } from '../../../../api/payload'
import { join } from 'node:path'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { readFile } from 'node:fs/promises'
import readingTime from 'reading-time'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(duration)

export const runtime = 'nodejs'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

async function getBlogPost(slug: string) {
  const blogPosts = await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (blogPosts.docs.length === 0) {
    return null
  }

  return blogPosts.docs[0]
}

function appendText(
  text: string,
  children?: {
    type: string
    version: number
    [key: string]: unknown
  }[],
) {
  if (!children) return text

  for (const child of children) {
    if (child.text) {
      text += ' ' + child.text
    }
    text = appendText(
      text,
      child.children as {
        type: string
        version: number
        [key: string]: unknown
      }[],
    )
  }

  return text
}

// Image generation
export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const logoData = await readFile(join(process.cwd(), 'logo.png'))
  const logoSrc = Uint8Array.from(logoData).buffer

  const blogPost = await getBlogPost((await params).slug)

  const logoCount = 5
  const width = 1200 / logoCount
  const height = (1043 / 456) * width

  const fullText = appendText('', blogPost?.text?.root.children)
  const stats = readingTime(fullText)
  const minutes = dayjs.duration(stats.minutes, 'minutes').humanize()

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        tw={cn('flex', 'flex-col', 'items-center', 'justify-center', 'relative', 'p-8')}
        style={{
          height: '100%',
          width: '100%',
          background: 'hsl(245, 30%, 8%)',
        }}
      >
        <div
          tw={cn('absolute', 'top-0', 'left-0', 'flex', 'flex-wrap', 'overflow-hidden')}
          style={{
            height: '100%',
            width: '100%',
            background: 'hsl(245, 30%, 8%)',
            zIndex: '-100',
          }}
        >
          {new Array(logoCount).fill(null).map((_, idx) => (
            <div
              style={{
                height,
                width,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={idx}
            >
              <div
                style={{
                  height: height * 0.75,
                  width: width * 0.75,
                  display: 'flex',
                  position: 'relative',
                  mixBlendMode: 'color-dodge',
                }}
              >
                {idx % 3 === 0 && (
                  <img
                    width={width * 0.75}
                    height={height * 0.75}
                    src={logoSrc as any}
                    alt="RaviAnand Mohabir"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <div
          tw={cn(
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'bg-gray-600',
            'rounded-xl',
            'bg-opacity-20',
            'border',
            'border-gray-100',
            'p-4',
          )}
          style={{ backgroundClip: 'padding-box', backdropFilter: 'blur(4px)' }}
        >
          <p tw={cn('text-4xl', 'font-bold', 'leading-none', 'tracking-tighter', 'text-white')}>
            RaviAnand Mohabir
          </p>
          <h1
            style={{
              /* backgroundImage: 'linear-gradient(to bottom right, #5d3053 35%, #6f394d)',
                backgroundClip: 'text', */
              filter:
                'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.06))',
            }}
            tw={cn('text-6xl', 'font-bold', 'leading-none', 'tracking-tighter', 'text-slate-300')}
          >
            {blogPost?.title}
          </h1>
          <div tw={cn('flex', 'items-center', 'text-slate-400')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="10" x2="14" y1="2" y2="2" />
              <line x1="12" x2="15" y1="14" y2="11" />
              <circle cx="12" cy="14" r="8" />
            </svg>
            <p tw={cn('ml-2')}>{minutes}</p>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}

export async function generateStaticParams() {
  const blogPosts = await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    pagination: false,
  })

  return blogPosts.docs.map((bp) => ({
    slug: bp.slug,
  }))
}
