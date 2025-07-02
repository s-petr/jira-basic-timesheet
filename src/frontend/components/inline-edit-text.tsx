import { Box, InlineEdit, Textfield, xcss } from '@forge/react'
import React, { useState } from 'react'

const readViewContainerStyles = xcss({
  paddingInline: 'space.075',
  paddingBlock: 'space.100'
})

export default function InlineEditText({ value }: { value: string }) {
  const [editValue, setEditValue] = useState(value)
  return (
    <InlineEdit
      defaultValue={editValue}
      editView={({ errorMessage: _, ...fieldProps }) => (
        <Textfield {...fieldProps} autoFocus />
      )}
      readView={() => <Box xcss={readViewContainerStyles}>{editValue}</Box>}
      onConfirm={(value) => setEditValue(value)}
    />
  )
}
