import { Box } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ColorSquare } from './ColorSquare'
import { Present } from './Present'

type PresentSingleColorProps = {
  color: string
  hoverEffect?: boolean
  subtitle?: string
  theme: Theme
  title?: string
}

export const PresentSingleColor = ({
  color,
  hoverEffect,
  subtitle,
  theme,
  title,
}: PresentSingleColorProps) => {
  const describedbyId = `describedby-${uuidv4()}`
  const labelledbyId = `labelledby-${uuidv4()}`
  const contrastColor = theme.palette.getContrastText(color)

  return (
    <Present
      bgcolor={color}
      color={contrastColor}
      colorCode={color}
      describedbyId={describedbyId}
      labelledbyId={labelledbyId}
      subtitle={subtitle}
      title={title}
    >
      <Box height={{ xs: theme.spacing(8), md: theme.spacing(14) }}>
        <ColorSquare
          bgcolor={color}
          color={contrastColor}
          hoverEffect={hoverEffect}
          theme={theme}
        />
      </Box>
    </Present>
  )
}
