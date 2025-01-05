import './global.css'

import Footer from './footer'
import LogoGrid from './logo-grid'
import { Metadata } from 'next'
import Navbar from './navbar'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import dayjs from 'dayjs'
import { getPayload } from '../../api/payload'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export const metadata: Metadata = {
  title: 'RaviAnand Mohabir',
  description:
    'CTO and software developer specializing in scalable web applications, CRMs, and client-focused solutions. Driving innovation at InnoPeak, a leading FinSure startup.',
}

async function Layout({ children }: { children: ReactNode }) {
  const contactPromise = (await getPayload()).findGlobal({ slug: 'contact' })

  return (
    <html className={cn('dark')}>
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

export default Layout
