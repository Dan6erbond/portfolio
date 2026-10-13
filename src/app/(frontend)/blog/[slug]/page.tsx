import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogPosts } from '../../../../api/blog'
import { BlogPostContent } from './post'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const blogPost = await getBlogPost((await params).slug)

  if (!blogPost) {
    notFound()
  }

  return {
    title: blogPost.title,
    description: blogPost.summary,
  } satisfies Metadata
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const blogPost = await getBlogPost((await params).slug)

  if (!blogPost) {
    notFound()
  }

  return <BlogPostContent blogPost={blogPost} />
}

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts({ pagination: false })

  return blogPosts.docs.map((bp) => ({
    slug: bp.slug,
  }))
}
