import { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experiences',
  access: {
    read: () => true,
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
