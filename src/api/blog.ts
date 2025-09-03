import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache'

import { blog_posts_tags } from '../payload-generated-schema'
import { getPayload } from './payload'

export async function getBlogPost(slug: string, draft?: boolean) {
  'use cache'
  cacheTag(slug)

  if (draft) {
    cacheLife('seconds')
  }

  const blogPosts = await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft,
  })

  if (blogPosts.docs.length === 0) {
    return null
  }

  return blogPosts.docs[0]
}

export async function getBlogPosts({
  searchTags,
  query,
  page,
}: {
  searchTags?: string[]
  query?: string
  page?: number
}) {
  'use cache'
  cacheTag('blog-posts')

  return await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    limit: 5,
    sort: '-createdAt',
    where: {
      ...(searchTags?.length
        ? {
            'tags.tag': {
              in: searchTags,
            },
          }
        : {}),
      or: query
        ? [
            {
              title: {
                like: query,
              },
            },
            {
              summary: {
                like: query,
              },
            },
          ]
        : [],
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
      ],
    },
    page,
  })
}

export async function getBlogTags() {
  'use cache'
  cacheTag('blog-tags')

  return await (await getPayload()).db.drizzle
    .selectDistinct({ tag: blog_posts_tags.tag })
    .from(blog_posts_tags)
}
