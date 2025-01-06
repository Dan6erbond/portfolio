import '@payloadcms/next/css'
import './custom.scss'

import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'

import React from 'react'
import type { ServerFunctionClient } from 'payload'
import config from '@payload-config'
import { importMap } from './admin/importMap.js'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
