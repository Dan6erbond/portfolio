import React, { ReactNode } from 'react'

import { cn } from '../../lib/utils'

export type TimelineProps = {
  items: Omit<TimelineItemProps, 'isActive' | 'isActiveBullet'>[]
  activeItem: number
}

export const Timeline = React.forwardRef<
  HTMLUListElement,
  TimelineProps & React.HTMLAttributes<HTMLUListElement>
>(({ className, items, activeItem, ...props }, ref) => (
  <ul className={cn('pl-4', className)} ref={ref} {...props}>
    {items.map((i, idx) => (
      <TimelineItem
        key={idx}
        isLast={idx === items.length - 1}
        isActive={activeItem === -1 ? false : activeItem >= idx + 1}
        isActiveBullet={activeItem === -1 ? false : activeItem >= idx}
        {...i}
      />
    ))}
  </ul>
))
Timeline.displayName = 'Timeline'

export type TimelineItemProps = {
  title: ReactNode
  description?: ReactNode
  bullet?: ReactNode
  isLast?: boolean
  isActive: boolean
  isActiveBullet: boolean
  className?: string
}

export const TimelineItem = React.forwardRef<
  HTMLLIElement,
  TimelineItemProps & Omit<React.HTMLAttributes<HTMLLIElement>, 'title'>
>(({ className, title, description, bullet, isLast, isActive, isActiveBullet, ...props }, ref) => (
  <li
    className={cn(
      'relative',
      'border-l-2',
      'pb-8',
      'pl-8',
      isLast && 'border-l-transparent pb-0',
      isActive && !isLast && 'border-l-primary',
      className,
    )}
    ref={ref}
    {...props}
  >
    <TimelineItemBullet isActive={isActiveBullet}>{bullet}</TimelineItemBullet>
    <TimelineItemTitle>{title}</TimelineItemTitle>
    {description && <TimelineItemDescription>{description}</TimelineItemDescription>}
  </li>
))
TimelineItem.displayName = 'TimelineItem'

export type TimelineItemBulletProps = {
  isActive?: boolean
}

export const TimelineItemBullet = React.forwardRef<
  HTMLDivElement,
  TimelineItemBulletProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, isActive, ...props }, ref) => (
  <div
    className={cn(
      `absolute top-0 flex items-center justify-center rounded-full border bg-background`,
      isActive && 'border-primary',
      'w-4',
      'h-4',
      'border-2',
      'left-[-9px]',
      className,
    )}
    aria-hidden
    ref={ref}
    {...props}
  />
))
TimelineItemBullet.displayName = 'TimelineItemBullet'

export const TimelineItemTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    className={cn('mb-1 text-base font-semibold leading-none', className)}
    ref={ref}
    {...props}
  />
))
TimelineItemTitle.displayName = 'TimelineItemTitle'

export const TimelineItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
))
TimelineItemDescription.displayName = 'TimelineItemDescription'
