import { Block, Field } from 'payload'

import { SyntaxHighlighter } from '../components/ui/syntax-highlighter'

export const codeFields: Field[] = [
  {
    type: 'select',
    name: 'language',
    options: SyntaxHighlighter.supportedLanguages,
    defaultValue: 'typescript',
  },
  {
    admin: {
      components: {
        Field: '../components/payload/CodeBlockField#CodeBlockField',
      },
    },
    name: 'code',
    type: 'code',
  },
  {
    type: 'text',
    name: 'highlightLines',
  },
]

export const Code: Block = {
  slug: 'Code',
  fields: codeFields,
}

export const CodeTabs: Block = {
  slug: 'CodeTabs',
  fields: [
    {
      name: 'files',
      type: 'array',
      fields: [
        {
          type: 'text',
          name: 'filename',
        },
        ...codeFields,
      ],
    },
  ],
}
