import { Contact } from './globals/Contact'
import { Experience } from './collections/Experience'
import { Media } from './collections/Media'
import { Project } from './collections/Project'
import { Users } from './collections/Users'
import { buildConfig } from 'payload'
import { docsReorder } from '@payload-enchants/docs-reorder'
import { fileURLToPath } from 'url'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Contact],
  collections: [Users, Media, Experience, Project],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin({}),
    docsReorder({
      collections: [{ slug: 'projects' }],
    }),
    // storage-adapter-placeholder
  ],
})
