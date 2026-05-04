import { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Project: CollectionConfig = {
  slug: 'projects',
  hooks: {
    afterChange: [
      ({}) => {
        revalidateTag('projects', 'max')
      },
    ],
    afterDelete: [
      ({}) => {
        revalidateTag('projects', 'max')
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'order',
      type: 'number',
    },
    {
      name: 'link',
      type: 'text',
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
