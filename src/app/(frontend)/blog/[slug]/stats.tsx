'use client'

import { useLayoutEffect, useState } from 'react'

import { Timer } from 'lucide-react'
import { cn } from '../../../../lib/utils'
import dayjs from 'dayjs'
import readingTime from 'reading-time'

function appendText(
  text: string,
  children?: {
    type: string
    version: number
    [key: string]: unknown
  }[],
) {
  if (!children) return text

  for (const child of children) {
    if (child.text) {
      text += ' ' + child.text
    }
    text = appendText(
      text,
      child.children as {
        type: string
        version: number
        [key: string]: unknown
      }[],
    )
  }

  return text
}

export default function Stats({
  text,
}: {
  text?: {
    root: {
      type: string
      children: {
        [k: string]: unknown
        type: string
        version: number
      }[]
      direction: 'ltr' | 'rtl' | null
      format: '' | 'start' | 'end' | 'center' | 'left' | 'right' | 'justify'
      indent: number
      version: number
    }
    [key: string]: unknown
  } | null
}) {
  const [minutes, setMinutes] = useState('')
  useLayoutEffect(() => {
    const fullText = appendText('', text?.root.children)
    const stats = readingTime(fullText)
    setMinutes(dayjs.duration(stats.minutes, 'minutes').humanize())
  }, [text])

  return (
    <div className={cn('flex', 'gap-2', 'text-slate-400')}>
      <Timer />
      <p>{minutes}</p>
    </div>
  )
}
