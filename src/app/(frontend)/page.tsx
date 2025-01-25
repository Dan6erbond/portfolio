import { ChevronRight } from 'lucide-react'
import { ExperiencesTimeline } from './experiences'
import Link from 'next/link'
import { MagicCard } from '../../components/ui/magic-card'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Suspense } from 'react'
import { Tag } from '../../components/ui/tag'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { cn } from '../../lib/utils'
import { getBlogPosts } from '../../api/blog'
import { getPayload } from '../../api/payload'

async function getLatestExperiences() {
  'use cache'
  cacheTag('experiences')

  return await (
    await getPayload()
  ).find({
    collection: 'experiences',
    limit: 5,
    sort: ['-start', '-end'],
  })
}

async function getAbout() {
  'use cache'
  cacheTag('about')

  return await (await getPayload()).findGlobal({ slug: 'about' })
}

async function getLatestProjects() {
  'use cache'
  cacheTag('projects')

  return await (
    await getPayload()
  ).find({
    collection: 'projects',
    limit: 5,
    sort: 'order',
  })
}

async function Home() {
  const experiences = getLatestExperiences()
  const about = await getAbout()
  const projects = await getLatestProjects()
  const blogPosts = await getBlogPosts({})

  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-24')}>
      <section className={cn('max-w-2xl', 'flex', 'flex-col', 'gap-4')}>
        <p className={cn('text-6xl')}>Hello</p>
        <p className={cn('text-2xl')}>I&apos;m RaviAnand Mohabir.</p>
        <p className={cn('text-lg')}>Software Engineer based in Switzerland</p>
        {about.text && (
          <RichText data={about.text} className={cn('prose', 'md:prose-md', 'dark:prose-invert')} />
        )}
      </section>
      <section className={cn('max-w-2xl')}>
        <h2 className={cn('text-2xl', 'mb-4')}>Experience</h2>
        <Suspense fallback={'Loading...'}>
          <ExperiencesTimeline experiences={experiences} />
        </Suspense>
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
