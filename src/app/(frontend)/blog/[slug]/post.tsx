import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb'

import Link from 'next/link'
import type { BlogPost as TBlogPost } from '../../../../payload-types'
import RichText from '../../../../components/ui/rich-text'
import ScrollProgress from '../../../../components/ui/scroll-progress'
import { Tag } from '../../../../components/ui/tag'
import { cn } from '../../../../lib/utils'
import { RefreshRouteOnSave } from './refresh'
import Stats from './stats'

export function BlogPostContent({
  blogPost,
  preview,
}: {
  blogPost: TBlogPost
  preview?: boolean
}) {
  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
      <ScrollProgress className="top-[65px]" />
      {preview && <RefreshRouteOnSave />}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blogPost.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className={cn('text-5xl')}>{blogPost.title}</h1>
      <p className={cn('text-lg')}>{blogPost.summary}</p>
      <Stats text={blogPost.text} />
      <div className={cn('flex', 'gap-2', 'flex-wrap', 'max-w-6xl')}>
        {blogPost.tags?.map(({ tag }) => (
          <Tag key={tag} asChild>
            <Link href={`/blog?${new URLSearchParams({ tags: tag }).toString()}`}>{tag}</Link>
          </Tag>
        ))}
      </div>
      {blogPost.text && <RichText data={blogPost.text} />}
    </div>
  )
}
