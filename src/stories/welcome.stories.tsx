import React from 'react'

export default {
  title: 'Welcome',
  decorators: [],
  parameters: {
    '@badgers/storybook-facelift': {
      main: {
        elevation: 2,
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
