import { Box, Color } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ColorSquare } from './ColorSquare'
import { Present } from './Present'

type ColorType = keyof Color

type PresentPaletteProps = {
  title?: string
  subtitle?: string
  color: Color
  theme: Theme
}

export const PresentPalette = ({ title, color, theme, subtitle }: PresentPaletteProps) => {
  const describedbyId = `describedby-${uuidv4()}`
  const labelledbyId = `labelledby-${uuidv4()}`

  const coreKeys = ['50', '100', '200', '300', '400', '500', '600', '700', '900']
  const expandedKeys = ['A100', 'A200', 'A400', 'A700']

  return (
    <Present
      describedbyId={describedbyId}
      labelledbyId={labelledbyId}
      subtitle={subtitle}
      title={title}
    >
      <Box component="section" display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
        {Object.keys(color).map((key) => {
          const colorCode = color[key as ColorType]
          const allow = coreKeys.includes(key)

          return allow ? (
            <Box
              height={{ xs: theme.spacing(8), md: theme.spacing(14) }}
              key={`color-grey-core-${uuidv4()}`}
              width={{ xs: '100%', md: '11.111111111111%' }}
            >
              <ColorSquare
                bgcolor={colorCode}
                color={theme.palette.getContrastText(colorCode)}
                subtitle={colorCode}
                theme={theme}
                title={`${key}`}
              />
            </Box>
          ) : null
        })}
      </Box>
      <Box component="section" display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
        {Object.keys(color).map((key) => {
          const colorCode = color[key as ColorType]
          const allow = expandedKeys.includes(key)

          return allow ? (
            <Box
              height={{ xs: theme.spacing(8), md: theme.spacing(14) }}
              key={`color-grey-expanded-${uuidv4()}`}
              width={{ xs: '100%', md: '25%' }}
            >
              <ColorSquare
                bgcolor={colorCode}
                color={theme.palette.getContrastText(colorCode)}
                subtitle={colorCode}
                theme={theme}
                title={`${key}`}
              />
            </Box>
          ) : null
        })}
      </Box>
    </Present>
  )
}
