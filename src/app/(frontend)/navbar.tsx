import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '../../lib/utils'

function Navbar() {
  return (
    <>
      <nav
        className={cn(
          'flex',
          'gap-4',
          'bg-background/75',
          'absolute',
          'top-0',
          'left-0',
          'h-[64px]',
          'w-full',
          'z-50',
          'backdrop-blur-sm',
          'p-2',
          'shadow',
        )}
      >
        <Link href="/">
          <Image width={20} height={30} src="/logo.png" alt="RaviAnand Mohabir" />
        </Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About Me</Link>
        <Link href="/about">Get in Touch</Link>
      </nav>
      <div className={cn('h-[64px]')} />
    </>
  )
}

export default Navbar
