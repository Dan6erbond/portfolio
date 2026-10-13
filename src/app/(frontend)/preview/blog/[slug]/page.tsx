import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getBlogPost } from '../../../../../api/blog'
import { BlogPostContent } from '../../../blog/[slug]/post'

export const metadata: Metadata = { robots: { index: false, follow: false } }

export default async function BlogPostPreview({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled } = await draftMode()

  if (!isEnabled) {
    notFound()
  }

  const blogPost = await getBlogPost((await params).slug, true)

  if (!blogPost) {
    notFound()
  }

  return <BlogPostContent blogPost={blogPost} preview />
}
