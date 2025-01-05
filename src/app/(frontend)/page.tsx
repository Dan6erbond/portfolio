import { ChevronRight, Dot } from 'lucide-react'

import Link from 'next/link'
import { MagicCard } from '../../components/ui/magic-card'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Tag } from '../../components/ui/tag'
import { Timeline } from '../../components/ui/timeline'
import { cn } from '../../lib/utils'
import dayjs from 'dayjs'
import { getPayload } from '../../api/payload'

async function Home() {
  const contact = await (await getPayload()).findGlobal({ slug: 'contact' })
  const experiences = await (
    await getPayload()
  ).find({
    collection: 'experiences',
    limit: 5,
    sort: ['-start', '-end'],
  })
  const projects = await (
    await getPayload()
  ).find({
    collection: 'projects',
    limit: 5,
    sort: 'order',
  })
  const blogPosts = await (
    await getPayload()
  ).find({
    collection: 'blog-posts',
    limit: 5,
    sort: '-createdAt',
  })

  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-24')}>
      <section className={cn('max-w-2xl', 'flex', 'flex-col', 'gap-4')}>
        <p className={cn('text-6xl')}>Hello</p>
        <p className={cn('text-2xl')}>I&apos;m RaviAnand Mohabir.</p>
        <p className={cn('text-lg')}>Software Engineer based in Switzerland</p>
        {/* Full RichText example with blocks:
      https://github.com/payloadcms/payload/blob/main/templates/website/src/components/RichText/index.tsx */}
        {contact.about && (
          <RichText
            data={contact.about}
            className={cn('prose', 'md:prose-md', 'dark:prose-invert')}
          />
        )}
      </section>
      <section className={cn('max-w-2xl')}>
        <h2 className={cn('text-2xl', 'mb-4')}>Experience</h2>
        <Timeline
          items={experiences.docs.map((exp) => ({
            title: (
              <div key={exp.id} className={cn('flex', 'flex-col', 'gap-2')}>
                <p className={cn('font-light')}>
                  {dayjs(exp.start).format('LL')} -{' '}
                  {exp.end ? dayjs(exp.end).format('LL') : 'Present'}
                </p>
                <p className={cn('text-xl', 'flex', 'gap-2', 'items-center')}>
                  <span>{exp.title}</span>
                  <Dot />
                  <span>{exp.company}</span>
                </p>
              </div>
            ),
            description: exp.description,
          }))}
          activeItem={experiences.docs.reduce(
            (idx, exp, i) => (exp.end == null || dayjs(exp.end).isAfter(dayjs()) ? i : idx),
            0,
          )}
        />
      </section>
      <section>
        <h2 className={cn('text-2xl', 'mb-4')}>Projects</h2>
        <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4')}>
          {projects.docs.map((proj) => (
            <MagicCard key={proj.id}>
              <div className={cn('flex', 'flex-col', 'gap-2', 'p-4')}>
                <h3 className={cn('text-xl', 'flex', 'gap-2', 'items-center')}>{proj.title}</h3>
                <p>{proj.description}</p>
                {proj.tags && (
                  <div className={cn('flex', 'gap-2', 'flex-wrap', 'items-center')}>
                    {proj.tags.map(({ tag }) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </MagicCard>
          ))}
        </div>
      </section>
      <section>
        <h2 className={cn('text-2xl', 'mb-4')}>Latest Blog Posts</h2>
        <div
          className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-4', 'mb-4')}
        >
          {blogPosts.docs.map((bp) => (
            <Link key={bp.id} href={`/blog/${bp.slug}`}>
              <MagicCard>
                <div className={cn('flex', 'flex-col', 'gap-2', 'p-4')}>
                  <h3 className={cn('text-xl')}>{bp.title}</h3>
                  <p>{bp.summary}</p>
                  {bp.tags && (
                    <div className={cn('flex', 'gap-2', 'flex-wrap', 'items-center')}>
                      {bp.tags.map(({ tag }) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              </MagicCard>
            </Link>
          ))}
        </div>
        <div className={cn('flex', 'justify-end')}>
          <Link href="/blog" className={cn('flex', 'gap-2', 'items-center')}>
            <span>See all</span>
            <ChevronRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
