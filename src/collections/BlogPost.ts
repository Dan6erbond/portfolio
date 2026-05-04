import { CollectionConfig } from 'payload'
import type { BlogPost as TBlogPost } from '../payload-types'
import { revalidateTag } from 'next/cache'
import slugify from 'slugify'

export const BlogPost: CollectionConfig = {
  slug: 'blog-posts',
  versions: {
    drafts: {
      validate: true,
    },
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc }: { doc: TBlogPost; previousDoc: TBlogPost }) => {
        revalidateTag('blog-posts', 'max')
        revalidateTag(doc.slug, 'max')

        if (
          doc.tags?.length &&
          previousDoc.tags?.length &&
          doc.tags.length > previousDoc.tags.length
        ) {
          revalidateTag('blog-tags', 'max')
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        revalidateTag('blog-posts', 'max')
        revalidateTag(doc.slug, 'max')
      },
    ],
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
      required: true,
      admin: {
        readOnly: true,
      },
      access: {
        create: () => false,
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            return slugify(siblingData.title, { lower: true, strict: true })
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
