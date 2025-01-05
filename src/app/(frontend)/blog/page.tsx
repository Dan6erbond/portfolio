import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/pagination'
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache'

import { Input } from '../../../components/ui/input'
import Link from 'next/link'
import { Metadata } from 'next'
import { Separator } from '../../../components/ui/separator'
import { Tag } from '../../../components/ui/tag'
import { blog_posts_tags } from '../../../payload-generated-schema'
import { cn } from '../../../lib/utils'
import { getPayload } from '../../../api/payload'

export const metadata: Metadata = { title: 'Blog', description: 'Read my latest blog posts' }

async function getBlogPosts({
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
      'tags.tag': {
        in: searchTags,
      },
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
    },
    page,
  })
}

async function getBlogTags() {
  'use cache'
  cacheLife('seconds')

  return await (await getPayload()).db.drizzle
    .selectDistinct({ tag: blog_posts_tags.tag })
    .from(blog_posts_tags)
}

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams

  const searchTags = sp.tags
    ? Array.isArray(sp.tags)
      ? sp.tags.reduce((tags, param) => [...tags, ...param.split(',')], new Array<string>())
      : sp.tags.split(',')
    : []

  const query = Array.isArray(sp.q) ? sp.q[0] : sp.q

  const page = sp.page ? (Array.isArray(sp.page) ? parseInt(sp.page[0]) : parseInt(sp.page)) : 1

  const blogPosts = await getBlogPosts({ searchTags, query, page })

  const tags = await getBlogTags()

  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
      <h1 className={cn('text-5xl', 'text-center')}>Blog</h1>
      <p className={cn('text-2xl', 'text-center')}>View my latest blog posts</p>
      <form method="get" className={cn('flex', 'justify-center')}>
        <Input
          className={cn('max-w-6xl')}
          placeholder="Search"
          id="query"
          name="q"
          defaultValue={query}
        />
      </form>
      <div
        className={cn('flex', 'gap-2', 'justify-center', 'flex-wrap', 'max-w-6xl', 'self-center')}
      >
        {tags.map(({ tag }) => (
          <Tag key={tag} asChild>
            <Link
              href={`?${new URLSearchParams({ ...sp, tags: [...searchTags, tag].join(',') }).toString()}`}
            >
              {tag}
            </Link>
          </Tag>
        ))}
      </div>
      <div className={cn('flex', 'flex-col', 'gap-4')}>
        {blogPosts.docs.map((bp, idx) => (
          <>
            <div key={bp.id} className={cn('flex', 'flex-col', 'gap-2')}>
              <Link
                key={bp.id}
                href={`/blog/${bp.slug}`}
                className={cn('flex', 'flex-col', 'gap-2')}
              >
                <h3 className={cn('text-xl', 'flex', 'gap-2', 'items-center')}>{bp.title}</h3>
                <p>{bp.summary}</p>
              </Link>
              {bp.tags && (
                <div className={cn('flex', 'gap-2', 'flex-wrap', 'items-center')}>
                  {bp.tags.map(({ tag }) => (
                    <Tag key={tag} asChild>
                      <Link href={`/blog?${new URLSearchParams({ tags: tag }).toString()}`}>
                        {tag}
                      </Link>
                    </Tag>
                  ))}
                </div>
              )}
            </div>
            {idx < blogPosts.docs.length && <Separator />}
          </>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`?${new URLSearchParams({ ...sp, page: Math.max(page - 1, 1).toString() }).toString()}`}
            />
          </PaginationItem>
          {new Array(blogPosts.totalPages).fill(null).map((_, idx) => (
            <PaginationItem key={idx + 1}>
              <PaginationLink
                href={`?${new URLSearchParams({ ...sp, page: (idx + 1).toString() }).toString()}`}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href={`?${new URLSearchParams({ ...sp, page: Math.min(page + 1, blogPosts.totalPages).toString() }).toString()}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
