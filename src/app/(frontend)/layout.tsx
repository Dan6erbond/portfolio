import './global.css'

import DayJs from './dayjs'
import Footer from './footer'
import Head from 'next/head'
import LogoGrid from './logo-grid'
import { Metadata } from 'next'
import Navbar from './navbar'
import { ReactNode } from 'react'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { cn } from '../../lib/utils'
import { getPayload } from '../../api/payload'

async function getAbout() {
  'use cache'
  cacheTag('about')

  return await (await getPayload()).findGlobal({ slug: 'about' })
}

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout()

  return {
    title: 'RaviAnand Mohabir',
    description: about.summary,
  }
}

async function getContact() {
  'use cache'
  cacheTag('contact')

  return await (await getPayload()).findGlobal({ slug: 'contact' })
}

export default async function Layout({ children }: { children: ReactNode }) {
  const contactPromise = getContact()

  return (
    <html className={cn('dark')}>
      <DayJs />
      <body>
        <Navbar contactPromise={contactPromise} />
        <main className={cn('min-h-[100vh]', 'p-4', 'relative')}>
          <LogoGrid />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
