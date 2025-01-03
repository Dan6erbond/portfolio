import { Popover, PopoverContent } from '../../components/ui/popover'

import Image from 'next/image'
import Link from 'next/link'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { cn } from '../../lib/utils'
import { getPayload } from '../../api/payload'
import { linkTypes } from '../../globals/Contact'

async function Navbar() {
  const contact = await (await getPayload()).findGlobal({ slug: 'contact' })

  return (
    <>
      <nav
        className={cn(
          'flex',
          'items-center',
          'gap-4',
          'bg-background/75',
          'fixed',
          'top-0',
          'left-0',
          'h-[64px]',
          'w-full',
          'z-50',
          'backdrop-blur-sm',
          'py-2',
          'px-4',
          'shadow',
        )}
      >
        <Link href="/" className={cn('mr-4')}>
          <Image width={20} height={30} src="/logo.png" alt="RaviAnand Mohabir" />
        </Link>
        <Link href="/projects">Projects</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About Me</Link>
        <Popover>
          <PopoverTrigger className={cn('ml-auto')}>Get in Touch</PopoverTrigger>
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
      </nav>
      <div className={cn('h-[64px]')} />
    </>
  )
}

export default Navbar
