import { GlobalConfig } from 'payload'
import { linkTypes } from './contactLinkTypes'
import { revalidateTag } from 'next/cache'
import { loggedInOnlyGlobalAccess } from '../access/isLoggedIn'

export const Contact: GlobalConfig = {
  slug: 'contact',
  access: loggedInOnlyGlobalAccess,
  hooks: {
    afterChange: [
      ({}) => {
        revalidateTag('contact', 'max')
      },
    ],
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: Object.entries(linkTypes).map(([value, lt]) => ({
            value,
            label: lt.label,
          })),
        },
        {
          name: 'url',
          type: 'text',
        },
      ],
    },
  ],
}
