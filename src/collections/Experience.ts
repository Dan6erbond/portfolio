import { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Experience: CollectionConfig = {
  slug: 'experiences',
  hooks: {
    afterChange: [
      ({}) => {
        revalidateTag('experiences', 'max')
      },
    ],
    afterDelete: [
      ({}) => {
        revalidateTag('experiences', 'max')
      },
    ],
  },
  fields: [
    {
      name: 'start',
      type: 'date',
    },
    {
      name: 'end',
      type: 'date',
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
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
