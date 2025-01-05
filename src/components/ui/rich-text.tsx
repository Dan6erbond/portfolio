/* eslint-disable @typescript-eslint/no-explicit-any */

import { CodeBlock } from './code-block'
import { ComponentProps } from 'react'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '../../lib/utils'

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
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        blocks: {
          Code: ({ node }) => {
            return (
              <CodeBlock
                filename={node.fields.blockName}
                language={(node.fields as any).language}
                code={(node.fields as any).code}
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
                }))}
              />
            )
          },
        },
      })}
      {...props}
    />
  )
}
