import config from '@payload-config'
import { getPayload as gp } from 'payload'

export const getPayload = async () => await gp({ config })
