import { Box } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Present } from './Present'
import { StoryParagraph } from './StoryParagraph'

type PreviewColorProps = {
  color: string
  subtitle?: string
  theme: Theme
  title?: string
}

export const PresentTextColor = ({ color, subtitle, theme, title }: PreviewColorProps) => {
  const describedbyId = `describedby-${uuidv4()}`
  const labelledbyId = `labelledby-${uuidv4()}`

  return (
    <Present
      describedbyId={describedbyId}
      labelledbyId={labelledbyId}
      title={title}
      colorCode={subtitle}
    >
      <Box p={1.5}>
        <StoryParagraph style={{ color: color, fontSize: theme.typography.h5.fontSize }}>
          The quick brown fox jumps over the lazy dog
        </StoryParagraph>
        <StoryParagraph style={{ color: color, fontSize: theme.typography.subtitle1.fontSize }}>
          The quick brown fox jumps over the lazy dog
        </StoryParagraph>
        <StoryParagraph style={{ color: color, fontSize: theme.typography.body1.fontSize }}>
          The quick brown fox jumps over the lazy dog
        </StoryParagraph>
        <StoryParagraph style={{ color: color, fontSize: theme.typography.body2.fontSize }}>
          The quick brown fox jumps over the lazy dog
        </StoryParagraph>
      </Box>
    </Present>
  )
}
