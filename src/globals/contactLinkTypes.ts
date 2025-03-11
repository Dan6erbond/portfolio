import { SiBluesky, SiGitea, SiGithub, SiLinkedin, SiReddit } from '@icons-pack/react-simple-icons'

import { Mail } from 'lucide-react'

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
