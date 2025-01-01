import './global.css'

import Head from 'next/head'
import LogoGrid from './logo-grid'
import Navbar from './navbar'
import { ReactNode } from 'react'
import { cn } from '../../lib/utils'

function Layout({ children }: { children: ReactNode }) {
  return (
    <html className={cn('dark')}>
      <Head>
        <title>RaviAnand Mohabir</title>
      </Head>
      <body>
        <LogoGrid />
        <Navbar />
        <main className={cn('min-h-[100vh]')}>{children}</main>
      </body>
    </html>
  )
}

export default Layout
