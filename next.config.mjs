import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  outputFileTracingIncludes: {
    '/blog/\\[slug\\]/opengraph-image': ['./logo.png'],
  },
}

export default withPayload(nextConfig)
