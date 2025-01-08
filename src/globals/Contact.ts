import { SiBluesky, SiGitea, SiGithub, SiLinkedin, SiReddit } from '@icons-pack/react-simple-icons'

import { GlobalConfig } from 'payload'
import { Mail } from 'lucide-react'
import { revalidateTag } from 'next/cache'

export const linkTypes = {
  linkedin: {
    label: 'LinkedIn',
    icon: SiLinkedin,
  },
  reddit: {
    label: 'Reddit',
    icon: SiReddit,
  },
  gitea: {
    label: 'Gitea',
    icon: SiGitea,
  },
  github: {
    label: 'GitHub',
    icon: SiGithub,
  },
  email: {
    label: 'Email',
    icon: Mail,
  },
  bluesky: {
    label: 'Bluesky',
    icon: SiBluesky,
  },
} as const

export const Contact: GlobalConfig = {
  slug: 'contact',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      ({}) => {
        revalidateTag('contact')
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
