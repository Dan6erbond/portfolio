import { CollectionConfig } from 'payload'
import slugify from 'slugify'

export const BlogPost: CollectionConfig = {
  slug: 'blog-posts',
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      validate: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
      access: {
        create: () => false,
      },
      hooks: {
        beforeChange: [
          ({ siblingData, operation, value }) => {
            if (operation === 'create') {
              return slugify(siblingData.title, { lower: true, strict: true })
            }
            return value
          },
        ],
      },
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'text',
      type: 'richText',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
