import { HTMLAttributes, ReactNode, forwardRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/utils'

type TagProps = {
  children: ReactNode
  asChild?: boolean
}

export const Tag = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & TagProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        className={cn(
          'py-2',
          'px-4',
          'bg-tag',
          'text-tag-foreground',
          'shadow',
          'rounded-full',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
Tag.displayName = 'Tag'
