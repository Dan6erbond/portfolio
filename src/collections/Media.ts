import type { CollectionConfig } from 'payload'
import { loggedInOnlyAccess } from '../access/isLoggedIn'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    ...loggedInOnlyAccess,
    read: ({ req: { user, pathname } }) => {
      if (!user && pathname.split('/').length < 4) return false

      return true
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}
