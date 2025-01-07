import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
    reactCompiler: false,
  },
  outputFileTracingIncludes: {
    '/blog/\\[slug\\]/opengraph-image': ['./logo.png'],
  },
}

export default withPayload(nextConfig)
