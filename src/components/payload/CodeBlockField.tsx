'use client'

import { CodeField, useFormFields } from '@payloadcms/ui'
import type { CodeFieldClient, CodeFieldClientProps } from 'payload'
import React, { useMemo } from 'react'

export const CodeBlockField: React.FC<CodeFieldClientProps> = ({
  autoComplete,
  field,
  forceRender,
  path,
  permissions,
  readOnly,
  renderedBlocks,
  schemaPath,
  validate,
}) => {
  const languageField = useFormFields(([fields]) => fields[path.replace('code', 'language')])

  const language: string =
    (languageField?.value as string) || (languageField.initialValue as string) || 'typescript'

  const props: CodeFieldClient = useMemo<CodeFieldClient>(
    () => ({
      ...field,
      type: 'code',
      admin: {
        ...field.admin,
        language: language,
        editorOptions: field.admin?.editorOptions,
      },
    }),
    [field, language],
  )

  const key = `${field.name}-${language}`

  return (
    <CodeField
      autoComplete={autoComplete}
      field={props}
      forceRender={forceRender}
      key={key}
      path={path}
      permissions={permissions}
      readOnly={readOnly}
      renderedBlocks={renderedBlocks}
      schemaPath={schemaPath}
      validate={validate}
    />
  )
}
