/* eslint-disable @typescript-eslint/no-explicit-any */

import { Code, CodeTabs } from '@payload-types'
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import {
  LinkJSXConverter,
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import { ComponentProps } from 'react'
import { cn } from '../../lib/utils'
import { CodeBlock } from './code-block'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<Code | CodeTabs>

function parseHighlightLines(hl?: string) {
  if (!hl) {
    return undefined
  }

  const hls = hl.split(',')

  return hls.reduce((lines, hl) => {
    const [f, t] = hl.split('-')
    const from = parseInt(f)

    if (t) {
      const to = parseInt(t)
      return [...lines, ...new Array(to - from + 1).fill(null).map((_, idx) => idx + from)]
    }

    return [...lines, from]
  }, new Array<number>())
}

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'blog-posts' ? `/blog/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    Code: ({ node }) => {
      return (
        <CodeBlock
          filename={node.fields.blockName}
          language={(node.fields as any).language}
          code={(node.fields as any).code}
          highlightLines={parseHighlightLines((node.fields as any).highlightLines)}
        />
      )
    },
    CodeTabs: ({ node }) => {
      return (
        <CodeBlock
          filename={node.fields.blockName}
          tabs={(node.fields as any).files.map((f: any) => ({
            name: f.filename,
            code: f.code,
            language: f.language,
            highlightLines: parseHighlightLines(f.highlightLines),
          }))}
        />
      )
    },
  },
})

export default function RichText({
  className,
  ...props
}: Omit<ComponentProps<typeof PayloadRichText>, 'converters'>) {
  return (
    <PayloadRichText
      className={cn(
        'prose',
        'prose-stone',
        'max-w-full',
        'lg:prose-xl',
        'dark:prose-invert',
        className,
      )}
      converters={jsxConverters}
      {...props}
    />
  )
}
