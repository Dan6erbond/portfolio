import config from '@payload-config'
import { getPayload } from 'payload'

if (process.env.POSTGRES_URL) {
  throw new Error('Refusing to seed: POSTGRES_URL is set. The seed script only targets the local SQLite database.')
}

const payload = await getPayload({ config })

const email = 'dev@example.com'

const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: email } } })
if (existingUsers.totalDocs === 0) {
  await payload.create({ collection: 'users', data: { email, password: 'dev-password' } })
}

const slug = 'hello-world'
const existingPosts = await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } } })
if (existingPosts.totalDocs === 0) {
  await payload.create({
    collection: 'blog-posts',
    context: { skipRevalidate: true },
    data: {
      title: 'Hello World',
      slug,
      summary: 'Seed post for local development.',
      tags: [{ tag: 'dev' }],
      text: {
        root: {
          type: 'root',
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              children: [{ type: 'text', text: 'This post only exists in the local SQLite database.', version: 1 }],
            },
          ],
        },
      },
      _status: 'published',
    },
  })
}

process.exit(0)
