import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb'

import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost } from '../../../../api/blog'
import { getPayload } from '../../../../api/payload'
import RichText from '../../../../components/ui/rich-text'
import ScrollProgress from '../../../../components/ui/scroll-progress'
import { Tag } from '../../../../components/ui/tag'
import { cn } from '../../../../lib/utils'
import { RefreshRouteOnSave } from './refresh'
import Stats from './stats'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled } = await draftMode()

  const blogPost = await getBlogPost((await params).slug, isEnabled)

  if (!blogPost) {
    notFound()
  }

  return {
    title: blogPost.title,
    description: blogPost.summary,
  } satisfies Metadata
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled } = await draftMode()

  const blogPost = await getBlogPost((await params).slug, isEnabled)

  if (!blogPost) {
    notFound()
  }

  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
      <ScrollProgress className="top-[65px]" />
      <RefreshRouteOnSave />
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
