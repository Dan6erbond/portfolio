import type { Access, CollectionConfig, GlobalConfig } from 'payload'

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const loggedInOnlyAccess = {
  create: isLoggedIn,
  read: isLoggedIn,
  update: isLoggedIn,
  delete: isLoggedIn,
} satisfies CollectionConfig['access']

export const loggedInOnlyGlobalAccess = {
  read: isLoggedIn,
  update: isLoggedIn,
} satisfies GlobalConfig['access']
