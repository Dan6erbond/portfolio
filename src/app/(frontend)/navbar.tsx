'use client'

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../components/ui/drawer'
import { Popover, PopoverContent } from '../../components/ui/popover'
import { use, useState } from 'react'

import { Button } from '../../components/ui/button'
import { Contact } from '../../payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '../../lib/utils'
import { linkTypes } from '../../globals/Contact'

type NavbarProps = {
  contactPromise: Promise<Contact>
}

const navbarLinks = [
  {
    path: '/blog',
    name: 'Blog',
  },
]

function Navbar({ contactPromise }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const contact = use(contactPromise)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <nav
        className={cn(
          'grid',
          'grid-cols-2',
          'md:grid-cols-3',
          'gap-4',
          'bg-background/90',
          'fixed',
          'top-0',
          'left-0',
          'h-[64px]',
          'w-full',
          'z-50',
          'backdrop-blur',
          'py-2',
          'px-4',
          'shadow',
        )}
      >
        <div>
          <Link href="/" className={cn('mr-4', 'hidden', 'md:block')}>
            <Image width={20} height={30} src="/logo.png" alt="RaviAnand Mohabir" />
          </Link>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon" className={cn('md:hidden')}>
              <Menu />
            </Button>
          </DrawerTrigger>
        </div>
        <div className={cn('items-center', 'gap-4', 'hidden', 'md:flex', 'justify-center')}>
          {navbarLinks.map((nl) => (
            <Link key={nl.path} href={nl.path}>
              {nl.name}
            </Link>
          ))}
        </div>
        <div className={cn('flex', 'justify-end')}>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  'cursor-pointer',
                  'py-2',
                  'px-4',
                  'rounded-full',
                  'shadow',
                  'bg-slate-950',
                  'bg-gradient-to-r',
                  'from-slate-950',
                  'from-70%',
                  'to-rose-950',
                  'backdrop-blur-xl',
                  'transition-shadow',
                  'duration-300',
                  'ease-in-out',
                  'hover:shadow',
                  'dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)]',
                  'dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]',
                )}
              >
                Get in Touch
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div className={cn('flex', 'flex-col', 'gap-2')}>
                {contact.links?.map((l) => {
                  const Icon = linkTypes[l.type].icon

                  return (
                    <a
                      href={l.url ?? ''}
                      target="_blank"
                      className={cn('flex', 'gap-2', 'items-center')}
                      key={l.id}
                    >
                      <Icon />
                      <p>{linkTypes[l.type].label}</p>
                    </a>
                  )
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
      <div className={cn('h-[64px]')} />
      <DrawerContent className={cn('pb-6')}>
        <DrawerHeader>
          <Link href="/" className={cn('flex', 'justify-center')}>
            <DrawerTitle className={cn('hidden')}>Home</DrawerTitle>
            <DrawerDescription className={cn('hidden')}>Navigation</DrawerDescription>
            <Image width={20} height={30} src="/logo.png" alt="RaviAnand Mohabir" />
          </Link>
        </DrawerHeader>
        <div className={cn('flex', 'flex-col', 'items-center', 'gap-4')}>
          {navbarLinks.map((nl) => (
            <Link key={nl.path} href={nl.path}>
              {nl.name}
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default Navbar
