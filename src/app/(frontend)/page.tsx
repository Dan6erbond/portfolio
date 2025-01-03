import { Dot } from 'lucide-react'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
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
    sort: '-start',
  })
  const projects = await (
    await getPayload()
  ).find({
    collection: 'projects',
    limit: 5,
    sort: 'order',
  })

  return (
    <div>
      <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
        <p className={cn('text-6xl')}>Hello</p>
        <p className={cn('text-2xl')}>I&apos;m RaviAnand Mohabir.</p>
        <p className={cn('text-lg')}>Software Engineer based in Switzerland</p>
        {/* Full RichText example with blocks:
      https://github.com/payloadcms/payload/blob/main/templates/website/src/components/RichText/index.tsx */}
        {contact.about && (
          <RichText
            data={contact.about}
            className={cn('prose', 'md:prose-md', 'dark:prose-invert', 'max-w-2xl')}
          />
        )}
        <h2 className={cn('text-2xl')}>Experience</h2>
        {experiences.docs.map((exp) => (
          <div key={exp.id} className={cn('max-w-2xl', 'flex', 'flex-col', 'gap-2')}>
            <p className={cn('font-light')}>
              {dayjs(exp.start).format('LL')} - {exp.end ? dayjs(exp.end).format('LL') : 'Present'}
            </p>
            <h4 className={cn('text-xl', 'flex', 'gap-2', 'items-center')}>
              <span>{exp.title}</span>
              <Dot />
              <span>{exp.company}</span>
            </h4>
            <p>{exp.description}</p>
            {exp.tags && (
              <div className={cn('flex', 'gap-2', 'flex-wrap', 'items-center')}>
                {exp.tags.map(({ tag }) => (
                  <div
                    key={tag}
                    className={cn(
                      'py-2',
                      'px-4',
                      'bg-tag',
                      'text-tag-foreground',
                      'shadow',
                      'rounded-full',
                    )}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {projects.docs.map((proj) => (
          <div key={proj.id} className={cn('max-w-2xl', 'flex', 'flex-col', 'gap-2')}>
            <h4 className={cn('text-xl', 'flex', 'gap-2', 'items-center')}>
              {proj.title}
            </h4>
            <p>{proj.description}</p>
            {proj.tags && (
              <div className={cn('flex', 'gap-2', 'flex-wrap', 'items-center')}>
                {proj.tags.map(({ tag }) => (
                  <div
                    key={tag}
                    className={cn(
                      'py-2',
                      'px-4',
                      'bg-tag',
                      'text-tag-foreground',
                      'shadow',
                      'rounded-full',
                    )}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
