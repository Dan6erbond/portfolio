import { cacheLife, cacheTag } from 'next/cache'

import { getPayload } from './payload'

export async function getBlogPost(slug: string, draft?: boolean) {
  'use cache'
  cacheTag(slug)
  cacheLife('max')

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
    cacheLife('minutes')
    return null
  }

  return blogPosts.docs[0]
}

type BlogPostsArgs = {
  searchTags?: string[]
  query?: string
  page?: number
  pagination?: boolean
}

export async function getBlogPosts(args: BlogPostsArgs) {
  return args.query ? findBlogPosts(args) : getCachedBlogPosts(args)
}

async function getCachedBlogPosts(args: BlogPostsArgs) {
  'use cache'
  cacheTag('blog-posts')
  cacheLife('max')

  return await findBlogPosts(args)
}

async function findBlogPosts({ searchTags, query, page, pagination }: BlogPostsArgs) {
  return await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    limit: 5,
    sort: '-createdAt',
    depth: 0,
    select: { title: true, slug: true, summary: true, tags: true },
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
    pagination,
  })
}

export async function getBlogTags() {
  'use cache'
  cacheTag('blog-tags')
  cacheLife('max')

  const { db } = await getPayload()
  const blogPostsTags = db.tables.blog_posts_tags

  return await db.drizzle.selectDistinct({ tag: blogPostsTags.tag }).from(blogPostsTags)
}
