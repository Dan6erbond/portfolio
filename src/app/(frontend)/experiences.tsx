'use client'

import { use, useLayoutEffect, useState } from 'react'

import { Dot } from 'lucide-react'
import { Experience } from '../../payload-types'
import { PaginatedDocs } from 'payload'
import { Timeline } from '../../components/ui/timeline'
import { cn } from '../../lib/utils'
import dayjs from 'dayjs'

export function ExperiencesTimeline({
  experiences,
}: {
  experiences: Promise<PaginatedDocs<Experience>>
}) {
  const exps = use(experiences)

  const [time, setTime] = useState<Date | null>(null)
  useLayoutEffect(() => {
    setTime(new Date())
  }, [])

  return (
    <Timeline
      items={exps.docs.map((exp) => ({
        title: (
          <div key={exp.id} className={cn('flex', 'flex-col', 'gap-2')}>
            <p className={cn('font-light')}>
              {dayjs(exp.start).format('LL')} - {exp.end ? dayjs(exp.end).format('LL') : 'Present'}
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
      activeItem={exps.docs.reduce(
        (idx, exp, i) => (exp.end == null || dayjs(exp.end).isAfter(time) ? i : idx),
        0,
      )}
    />
  )
}
