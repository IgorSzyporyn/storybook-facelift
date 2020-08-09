import { Box } from '@material-ui/core'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import {
  CommonColors,
  Palette,
  PaletteColor,
  TypeBackground,
  TypeText,
} from '@material-ui/core/styles/createPalette'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { PresentColor } from '../blocks/PresentColor'
import { PresentPalette } from '../blocks/PresentPalette'
import { PresentSingleColor } from '../blocks/PresentSingleColor'
import { PresentTextColor } from '../blocks/PresentTextColor'
import { StoryParagraph } from '../blocks/StoryParagraph'
import { StoryTitle } from '../blocks/StoryTitle'

const useStyles = makeStyles((theme) =>
  createStyles({
    grid: {
      display: 'grid',
      gridColumnGap: theme.spacing(4),
      gridRowGap: theme.spacing(4),
      marginBottom: theme.spacing(8),
      marginTop: theme.spacing(2),
    },
  })
)

type ContextSubtitles = {
  [k in ColorType]?: string
}

const contextSubtitles: ContextSubtitles = {
  primary: `Used to represent primary interface elements for a user. It's the color displayed most frequently across your app's screens and components.`,
  secondary: `Used to represent secondary interface elements for a user. It provides more ways to accent and distinguish your product. Having it is optional.`,
  error: `Used to represent interface elements that the user should be made aware of.`,
  warning: `Used to represent potentially dangerous actions or important messages.`,
  info: `Used to present information to the user that is neutral and not necessarily important.`,
  success: `Used to indicate the successful completion of an action that user triggered.`,
}

// @PRESENTATION
type BackgroundSubtitles = {
  [k in typeof backgroundColors[number]]: string
}

const backgroundSubtitles: BackgroundSubtitles = {
  default: 'The main background color used for surfaces.',
  paper:
    'The base color used for elevated surfaces.\n\nIn dark mode the brightness increases with elevation of surface.',
}

type CommonSubtitles = {
  [k in typeof commonColors[number]]: string
}

const commonSubtitles: CommonSubtitles = {
  white: 'Absolute white color',
  black: 'Avoid using as it can cause flickering on some mobile devices due to battery saving.',
}

const contextColors: ColorType[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success']
const textColors: TextColorType[] = ['primary', 'secondary', 'disabled', 'hint']
const commonColors: CommonColorType[] = ['white', 'black']
const backgroundColors: BackgroundColorType[] = ['default', 'paper']

type ColorType = keyof Palette
type TextColorType = keyof TypeText
type BackgroundColorType = keyof TypeBackground
type CommonColorType = keyof CommonColors

type PaletteStoryProps = {
  theme: Theme
}

export const PaletteStory = ({ theme }: PaletteStoryProps) => {
  const classes = useStyles()

  return (
    <Box>
      <div hidden>
        <StoryTitle level={1}>Palette Story</StoryTitle>
        <StoryTitle level={2}>UI to present Material UI palette</StoryTitle>
      </div>
      <StoryTitle level={2}>Colors</StoryTitle>
      <StoryParagraph>
        The theme exposes the following context colors under theme.palette.*
      </StoryParagraph>
      <Box
        className={classes.grid}
        gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }}
      >
        {contextColors.map((key) => {
          const paletteColor = theme.palette[key] as PaletteColor

          return (
            <PresentColor
              color={paletteColor}
              key={`palette-context-${uuidv4()}`}
              subtitle={contextSubtitles[key]}
              theme={theme}
              title={`theme.palette.${key}`}
            />
          )
        })}
      </Box>
      <StoryTitle level={2}>Grey</StoryTitle>
      <StoryParagraph>
        The theme exposes the following greyscale under theme.palette.grey.*
      </StoryParagraph>
      <Box className={classes.grid}>
        <PresentPalette
          color={theme.palette.grey}
          key={`palette-grey-${uuidv4()}`}
          subtitle="Used for borders etc.. come up with something cool and usefull here..."
          theme={theme}
        />
      </Box>
      <StoryTitle level={2}>Surfaces</StoryTitle>
      <StoryParagraph>
        The theme exposes 2 surfaces colors under theme.palette.background.*
      </StoryParagraph>
      <Box className={classes.grid} gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}>
        {backgroundColors.map((key) => {
          const backgroundColor = theme.palette.background[key]

          return (
            <PresentSingleColor
              color={backgroundColor}
              key={`palette-background-${uuidv4()}`}
              subtitle={backgroundSubtitles[key]}
              theme={theme}
              title={`palette.background.${key}`}
            />
          )
        })}
      </Box>
      <StoryTitle level={2}>Absolute Black and White</StoryTitle>
      <StoryParagraph>
        The theme exposes 2 surfaces colors under theme.palette.background.*
      </StoryParagraph>
      <Box className={classes.grid} gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}>
        {commonColors.map((key) => {
          const backgroundColor = theme.palette.common[key]

          return (
            <PresentSingleColor
              color={backgroundColor}
              key={`palette-common-${uuidv4()}`}
              subtitle={commonSubtitles[key]}
              theme={theme}
              title={`palette.common.${key}`}
            />
          )
        })}
      </Box>
      <StoryTitle level={2}>Text</StoryTitle>
      <StoryParagraph>Some stuff about text - plenty to write...</StoryParagraph>
      <Box className={classes.grid} gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}>
        {textColors.map((key) => {
          const textColor = theme.palette.text[key]

          return (
            <PresentTextColor
              color={textColor}
              key={`palette-text-${uuidv4()}`}
              theme={theme}
              title={`palette.text.${key}`}
              subtitle={textColor}
            />
          )
        })}
      </Box>
    </Box>
  )
}
