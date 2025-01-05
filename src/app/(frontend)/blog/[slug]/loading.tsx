import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../../../../components/ui/breadcrumb'

import ScrollProgress from '../../../../components/ui/scroll-progress'
import { Skeleton } from '../../../../components/ui/skeleton'
import { Tag } from '../../../../components/ui/tag'
import { cn } from '../../../../lib/utils'

export default function Loading() {
  return (
    <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
      <ScrollProgress className="top-[65px]" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Skeleton className={cn('h-6', 'w-12')} />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Skeleton className={cn('h-6', 'w-24')} />
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Skeleton className={cn('h-10')} />
      <div>
        <Skeleton className={cn('h-6', 'mb-2')} />
        <Skeleton className={cn('h-6', 'mb-2')} />
        <Skeleton className={cn('h-6', 'mb-2')} />
      </div>
      <div
        className={cn('flex', 'gap-2', 'justify-center', 'flex-wrap', 'max-w-6xl', 'self-center')}
      >
        {new Array(3).fill(null).map((_, idx) => (
          <Tag key={idx}>
            <Skeleton className={cn('h-4', 'w-8')} />
          </Tag>
        ))}
      </div>
      <div>
        <Skeleton className={cn('h-6', 'mb-2')} />
        <Skeleton className={cn('h-6', 'mb-2')} />
        <Skeleton className={cn('h-6', 'mb-2')} />
        <Skeleton className={cn('h-6', 'mb-2')} />
        <Skeleton className={cn('h-6', 'mb-2')} />
      </div>
    </div>
  )
}
