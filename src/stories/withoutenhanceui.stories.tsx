import React from 'react'

export default {
  title: 'Variations/Without UI Enhancements',
  decorators: [],
  parameters: {
    '@badgers/facelift': {
      enhanceUi: false,
    },
  },
  includeStories: ['WithoutEnhancements'],
}

export const WithoutEnhancements = () => {
  return (
    <div>
      <h1>Story without enhanceUI set</h1>
      <p>
        Mollit laboris minim ut ipsum nulla dolore labore dolore. Duis voluptate labore aute qui
        anim elit cupidatat cillum. Ea et veniam et eiusmod ex sunt pariatur voluptate nostrud
        nostrud in ex nostrud veniam. Veniam nisi enim tempor laboris aliqua. Aute eu nulla ea
        consectetur enim.
      </p>
      <p>
        Eiusmod laborum exercitation minim culpa commodo officia commodo excepteur cupidatat
        nostrud. Officia tempor deserunt nostrud labore magna esse culpa pariatur tempor esse dolor
        sunt deserunt duis. Occaecat sint magna excepteur culpa anim incididunt veniam do amet est
        consequat eiusmod. Id elit aliquip deserunt nostrud. Quis aliquip sit pariatur eu ex fugiat
        incididunt est amet nostrud nulla ad deserunt ut.
      </p>
    </div>
  )
}
