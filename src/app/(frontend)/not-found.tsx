import { Metadata } from 'next'
import Link from 'next/link'
import { cn } from '../../lib/utils'

export const metadata: Metadata = { title: 'Not Found', robots: { index: false, follow: false } }

export default function NotFound() {
  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4', 'items-center')}>
      <h1 className={cn('text-5xl', 'text-center')}>404</h1>
      <p className={cn('text-2xl', 'text-center')}>This page could not be found</p>
      <div className={cn('flex', 'gap-4')}>
        <Link href="/" className={cn('underline')}>
          Return home
        </Link>
        <Link href="/blog" className={cn('underline')}>
          Read the blog
        </Link>
      </div>
    </div>
  )
}
