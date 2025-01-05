import { BlogPostTags } from './tags'
import { BlogPosts } from './posts'
import { Input } from '../../../components/ui/input'
import { Metadata } from 'next'
import { SearchBar } from './search-bar'
import { Skeleton } from '../../../components/ui/skeleton'
import { Suspense } from 'react'
import { Tag } from '../../../components/ui/tag'
import { cn } from '../../../lib/utils'

export const metadata: Metadata = { title: 'Blog', description: 'Read my latest blog posts' }

export default async function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
      <h1 className={cn('text-5xl', 'text-center')}>Blog</h1>
      <p className={cn('text-2xl', 'text-center')}>View my latest blog posts</p>
      <Suspense
        fallback={
          <form method="get" className={cn('flex', 'justify-center')}>
            <Input className={cn('max-w-6xl')} placeholder="Search" id="query" name="q" />
          </form>
        }
        key="search-bar"
      >
        <SearchBar searchParams={searchParams} />
      </Suspense>
      <Suspense
        fallback={
          <div
            className={cn(
              'flex',
              'gap-2',
              'justify-center',
              'flex-wrap',
              'max-w-6xl',
              'self-center',
            )}
          >
            {new Array(12).fill(null).map((_, idx) => (
              <Tag key={idx}>
                <Skeleton className={cn('h-4', 'w-8')} />
              </Tag>
            ))}
          </div>
        }
        key="tags"
      >
        <BlogPostTags searchParams={searchParams} />
      </Suspense>
      <Suspense
        fallback={
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            {new Array(12).fill(null).map((_, idx) => (
              <div key={idx} className={cn('flex', 'flex-col', 'gap-2')}>
                <Skeleton className={cn('h-6', 'w-96', 'mb-2')} />
                <Skeleton className={cn('h-4')} />
                <Skeleton className={cn('h-4')} />
                <Skeleton className={cn('h-4')} />
                <div className={cn('flex', 'gap-2', 'flex-wrap', 'items-center')}>
                  {new Array(3).fill(null).map((_, idx) => (
                    <Tag key={idx}>
                      <Skeleton className={cn('h-4', 'w-8')} />
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
        key="posts"
      >
        <BlogPosts searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
