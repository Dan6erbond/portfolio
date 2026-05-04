import { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const About: GlobalConfig = {
  slug: 'about',
  hooks: {
    afterChange: [
      ({}) => {
        revalidateTag('about', 'max')
      },
    ],
  },
  fields: [
    { name: 'summary', type: 'textarea' },
    { name: 'text', type: 'richText' },
  ],
}
