import Link from 'next/link'
import { Tag } from '../../../components/ui/tag'
import { blog_posts_tags } from '../../../payload-generated-schema'
import { cn } from '../../../lib/utils'
import { getPayload } from '../../../api/payload'

export async function BlogPostTags({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sp = await searchParams

  const searchTags = sp.tags
    ? Array.isArray(sp.tags)
      ? sp.tags.reduce((tags, param) => [...tags, ...param.split(',')], new Array<string>())
      : sp.tags.split(',')
    : []

  const tags = await (await getPayload()).db.drizzle
    .selectDistinct({ tag: blog_posts_tags.tag })
    .from(blog_posts_tags)

  return (
    <div className={cn('flex', 'gap-2', 'justify-center', 'flex-wrap', 'max-w-6xl', 'self-center')}>
      {tags.map(({ tag }) => (
        <Tag key={tag} asChild>
          <Link
            href={`?${new URLSearchParams({ ...sp, tags: [...searchTags, tag].join(',') }).toString()}`}
          >
            {tag}
          </Link>
        </Tag>
      ))}
    </div>
  )
}
