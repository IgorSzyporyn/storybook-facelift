import React from 'react'
import { Typography, TypographyProps } from '@material-ui/core'
import { Variant } from '@material-ui/core/styles/createTypography'

type LevelConfigItem = {
  component: 'h3' | 'h4' | 'h5' | 'h6'
  variant: Variant
}

type LevelConfigTypes = 1 | 2 | 3 | 4

// @PRESENTATION
type LevelConfig = {
  [K in LevelConfigTypes]: LevelConfigItem
}

const levelProps: LevelConfig = {
  1: { component: 'h3', variant: 'h5' },
  2: { component: 'h4', variant: 'h6' },
  3: { component: 'h5', variant: 'body1' },
  4: { component: 'h6', variant: 'body2' },
}

type StoryTitleProps = {
  level?: LevelConfigTypes
  noMargin?: boolean
} & TypographyProps

export const StoryTitle = ({ level = 1, children, noMargin, ...rest }: StoryTitleProps) => {
  const typeProps = levelProps[level]
  const props = {
    ...rest,
    ...typeProps,
  }

  return (
    <Typography gutterBottom={!noMargin} {...props}>
      {children}
    </Typography>
  )
}
