import React from 'react'

export default {
  title: 'Welcome',
  decorators: [],
  parameters: {
    '@badgers/facelift': {
      main: {
        elevation: 0,
      },
    },
  },
  includeStories: ['Introduction'],
}

export const Introduction = () => {
  return (
    <div>
      <p>Here introduction Paragraph #1</p>
      <p>Here introduction Paragraph #2</p>
    </div>
  )
}
