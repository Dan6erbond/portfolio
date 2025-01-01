'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'

import Image from 'next/image'
import { cn } from '../../lib/utils'

function LogoGrid() {
  const bgRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    if (bgRef.current) {
      const colWidth = bgRef.current.clientWidth / 3
      setWidth(colWidth)
      setHeight((1043 / 456) * colWidth)
    }
  }, [bgRef])

  return (
    <div
      className={cn(
        'absolute',
        'top-0',
        'left-0',
        'h-full',
        'w-full',
        'z-[-100]',
        'bg-background',
        'overflow-hidden',
      )}
      ref={bgRef}
    >
      <div className={cn('grid', 'grid-cols-3')}>
        {new Array(120).fill(null).map((_, idx) => (
          <div
            className={cn('flex', 'items-center', 'justify-center')}
            style={{ height, width }}
            key={idx}
          >
            <div
              className={cn('relative', 'mix-blend-color-dodge')}
              style={{ height: height * 0.75, width: width * 0.75 }}
            >
              {idx % 2 === 0 && (
                <Image
                  width={width * 0.75}
                  height={height * 0.75}
                  src="/logo.png"
                  alt="RaviAnand Mohabir"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoGrid
