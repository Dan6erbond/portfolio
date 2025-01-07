import './global.css'

import { Metadata, Viewport } from 'next'

import DayJs from './dayjs'
import Footer from './footer'
import { Inter } from 'next/font/google'
import LogoGrid from './logo-grid'
import Navbar from './navbar'
import { ReactNode } from 'react'
import Script from 'next/script'
import { unstable_cacheTag as cacheTag } from 'next/cache'
import { cn } from '../../lib/utils'
import { getPayload } from '../../api/payload'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

async function getAbout() {
  'use cache'
  cacheTag('about')

  return await (await getPayload()).findGlobal({ slug: 'about' })
}

export const viewport: Viewport = {
  themeColor: 'zinc',
  colorScheme: 'dark',
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
    <html lang="en" className={cn('dark', inter.variable)}>
      {process.env.UMAMI_WEBSITE_ID && (
        <Script defer src={process.env.UMAMI_JS} data-website-id={process.env.UMAMI_WEBSITE_ID} />
      )}
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
