import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '../../lib/utils'
import { getPayload } from '../../api/payload'

async function Home() {
  const contact = await (await getPayload()).findGlobal({ slug: 'contact' })

  return (
    <div>
      <div className={cn('container', 'mx-auto', 'flex', 'flex-col', 'gap-4')}>
        <p className={cn('text-6xl')}>Hello</p>
        <p className={cn('text-2xl')}>I&apos;m RaviAnand Mohabir.</p>
        <p className={cn('text-lg')}>Software Engineer based in Switzerland</p>
        {/* Full RichText example with blocks:
      https://github.com/payloadcms/payload/blob/main/templates/website/src/components/RichText/index.tsx */}
        {contact.about && (
          <RichText
            data={contact.about}
            className={cn('prose', 'md:prose-md', 'dark:prose-invert', 'max-w-2xl')}
          />
        )}
        <h2 className={cn('text-2xl')}>Experience</h2>
      </div>
    </div>
  )
}

export default Home
