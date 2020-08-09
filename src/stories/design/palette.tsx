import React from 'react'
import { storiesOf } from '@storybook/react'
import { Parameters } from '../../typings'
import { Story, StoryParagraph, StoryTitle } from '../../components/blocks'
import { PaletteStory } from '../../components/stories'
import { Link, Theme } from '@material-ui/core'

export function createPaletteStory({ path, title }: Parameters.Story) {
  // eslint-disable-next-line no-undef
  storiesOf(`${path}`, module).add(`${title}`, () => {
    return (
      <Story
        title="Palette"
        subtitle="Material Design based palette scheme"
        description={
          <>
            <StoryParagraph>
              Material UI follows the{' '}
              <Link
                title="Material Design Website [color & palette]"
                href="https://material.io/design/color/the-color-system.html#color-usage-and-palettes"
                target="_blank"
              >
                Material Design color usage and palettes guidelines
              </Link>
              , and provides a strict and thorough theming framework to build your theming needs
              upon - Click to read more about the{' '}
              <Link
                title="Material UI Palette"
                target="_blank"
                href="https://material-ui.com/customization/palette/"
              >
                Material UI Palette.
              </Link>
            </StoryParagraph>
          </>
        }
        render={(theme, type) => {
          return type === 'mui' ? (
            <PaletteStory theme={theme as Theme} />
          ) : (
            <StoryTitle>Only supports Material UI Themes</StoryTitle>
          )
        }}
      />
    )
  })
}
