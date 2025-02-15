import { draftMode } from 'next/headers'
import { getBlogPost } from '../../../../../api/blog'
import { redirect } from 'next/navigation'

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
