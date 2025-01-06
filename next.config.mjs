import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    dynamicIO: true,
    reactCompiler: {
      compilationMode: 'annotation',
    },
  },
}

export default withPayload(nextConfig)
