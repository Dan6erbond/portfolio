import { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const About: GlobalConfig = {
  slug: 'about',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({}) => {
        revalidateTag('about')
      },
    ],
  },
  fields: [
    { name: 'summary', type: 'textarea' },
    { name: 'text', type: 'richText' },
  ],
}
