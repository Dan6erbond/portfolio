import { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import { loggedInOnlyGlobalAccess } from '../access/isLoggedIn'

export const About: GlobalConfig = {
  slug: 'about',
  access: loggedInOnlyGlobalAccess,
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
