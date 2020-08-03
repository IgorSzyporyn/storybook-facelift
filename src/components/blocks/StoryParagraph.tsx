import { Typography, TypographyProps } from '@material-ui/core'
import React from 'react'
import { StoryMarkdown } from './StoryMarkdown'

type StoryParagraphProps = {
  source?: string
} & TypographyProps

export const StoryParagraph = ({ children, source, ...rest }: StoryParagraphProps) => {
  return (
    <Typography variant="body1" paragraph component={source ? 'span' : 'p'} {...rest}>
      {source ? <StoryMarkdown source={source} noMargin inheritStyles /> : children}
    </Typography>
  )
}
