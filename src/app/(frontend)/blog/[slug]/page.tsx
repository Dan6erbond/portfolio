import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost, getBlogSlugs } from '../../../../api/blog'
import { BlogPostContent } from './post'

async function getPublishedBlogPost(params: Promise<{ slug: string }>) {
  const { slug } = await params

  if (!(await getBlogSlugs()).includes(slug)) {
    notFound()
  }

  const blogPost = await getBlogPost(slug)

  if (!blogPost) {
    notFound()
  }

  return blogPost
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const blogPost = await getPublishedBlogPost(params)

  return {
    title: blogPost.title,
    description: blogPost.summary,
  } satisfies Metadata
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostContent blogPost={await getPublishedBlogPost(params)} />
}

export async function generateStaticParams() {
  return (await getBlogSlugs()).map((slug) => ({ slug }))
}
