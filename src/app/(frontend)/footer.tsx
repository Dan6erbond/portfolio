import { Dot } from 'lucide-react'
import React from 'react'
import { cn } from '../../lib/utils'

export default function Footer() {
  return (
    <footer
      className={cn(
        'h-[80px]',
        'shadow',
        'bg-slate-950',
        'bg-gradient-to-r',
        'from-slate-950',
        'from-70%',
        'to-rose-950',
        'flex',
        'items-center',
        'justify-center',
        'mt-8',
      )}
    >
      <div className={cn('flex', 'gap-2', 'items-center')}>
        <span>© Copyright</span>
        <Dot />
        <span>RaviAnand Mohabir, 2025</span>
      </div>
    </footer>
  )
}
