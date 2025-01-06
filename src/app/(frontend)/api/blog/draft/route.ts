import { cacheTag } from 'next/dist/server/use-cache/cache-tag'
import { draftMode } from 'next/headers'
import { getPayload } from '../../../../../api/payload'
import { redirect } from 'next/navigation'

async function getBlogPost(slug: string) {
  'use cache'
  cacheTag(slug)

  const blogPosts = await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    draft: true,
  })

  if (blogPosts.docs.length === 0) {
    return null
  }

  return blogPosts.docs[0]
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.DRAFT_MODE_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  const blogPost = await getBlogPost(slug!)

  if (!blogPost) {
    return new Response('Invalid slug', { status: 404 })
  }

  // Enable Draft Mode by setting the cookie
  const draft = await draftMode()
  draft.enable()

  redirect(`/blog/${blogPost.slug}`)
}
