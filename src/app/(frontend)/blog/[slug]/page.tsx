import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb'

import { CodeBlock } from '../../../../components/ui/code-block'
import Link from 'next/link'
import React from 'react'
import RichText from '../../../../components/ui/rich-text'
import ScrollProgress from '../../../../components/ui/scroll-progress'
import { Tag } from '../../../../components/ui/tag'
import { cn } from '../../../../lib/utils'
import { getPayload } from '../../../../api/payload'
import { notFound } from 'next/navigation'

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const blogPosts = await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: (await params).slug,
      },
    },
  })

  if (blogPosts.docs.length === 0) {
    notFound()
  }

  const blogPost = blogPosts.docs[0]

  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
      <ScrollProgress className="top-[65px]" />
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
      <p className={cn('text-xl')}>{blogPost.summary}</p>
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
