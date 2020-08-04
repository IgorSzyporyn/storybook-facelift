import { convert, Global, themes } from '@storybook/theming'
import React from 'react'
import { Parameters } from '../typings'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'
import { elevationMap } from './elevation'
import pick from 'pick-a-good-color'
import { emphasize, getContrastRatio, lighten, darken } from '@material-ui/core'

export const ManagerStyles = () => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    parameters,
    state: { themeVariant, theme: _theme },
  } = settings

  const rootId = `#root`
  let boxShadow = 'none'

  const { main } = parameters
  const elevation: Parameters.MainElevationTypes = main.elevation !== undefined ? main.elevation : 1
  boxShadow = elevationMap[elevation]

  const themeVars = _theme || { ...themes[themeVariant] }
  const theme = convert(themeVars)
  const isDark = themeVariant === 'dark'

  const defaultText = theme.color.defaultText
  const inverseText = theme.color.inverseText

  const colors: string[] = [
    defaultText,
    emphasize(defaultText, 0.1),
    emphasize(defaultText, 0.15),
    emphasize(defaultText, 0.2),
    emphasize(defaultText, 0.25),
    emphasize(defaultText, 0.3),
    emphasize(defaultText, 0.35),
    emphasize(defaultText, 0.4),
    emphasize(defaultText, 0.45),
    emphasize(defaultText, 0.5),
    emphasize(defaultText, 0.55),
    emphasize(defaultText, 0.6),
    emphasize(defaultText, 0.65),
    emphasize(defaultText, 0.7),
    emphasize(defaultText, 0.75),
    emphasize(defaultText, 0.8),
    emphasize(defaultText, 0.85),
    emphasize(defaultText, 0.9),
    emphasize(defaultText, 0.95),
    emphasize(inverseText, 0.1),
    emphasize(inverseText, 0.15),
    emphasize(inverseText, 0.2),
    emphasize(inverseText, 0.25),
    emphasize(inverseText, 0.3),
    emphasize(inverseText, 0.35),
    emphasize(inverseText, 0.4),
    emphasize(inverseText, 0.45),
    emphasize(inverseText, 0.5),
    emphasize(inverseText, 0.55),
    emphasize(inverseText, 0.6),
    emphasize(inverseText, 0.65),
    emphasize(inverseText, 0.7),
    emphasize(inverseText, 0.75),
    emphasize(inverseText, 0.8),
    emphasize(inverseText, 0.85),
    emphasize(inverseText, 0.9),
    emphasize(inverseText, 0.95),
    inverseText,
  ]

  const selectedMenuItemColor = pick(colors, {
    background: theme.color.secondary,
    contrast: 4.5,
  })

  return (
    <Global
      styles={{
        [`${rootId}`]: {
          '.sidebar-header': {
            display: 'flex',
            alignItems: 'center',
          },

          '.sidebar-subheading': {
            fontWeight: isDark ? 500 : 700,
          },

          '.sidebar-expander': {
            top: '12px',
          },

          '.sidebar-svg-icon': {
            height: '11px',
            width: 'auto',
          },

          '.sidebar-item': {
            transition: 'background color 100ms ease-in-out',
            height: '30px',

            '&.selected': {
              color: selectedMenuItemColor,

              '& .sidebar-svg-icon': {
                marginTop: '-1px',
              },

              '& span:last-of-type': {
                fontWeight: 500,
                opacity: 0.95,
              },
            },

            '& span:last-of-type': {
              fontWeight: 400,
            },
          },

          '.os-host .os-content > div > div:first-of-type > span': {
            background: theme.barTextColor,
            opacity: 0.24,
          },

          '& > div > div:last-child > div:first-of-type': {
            boxShadow: boxShadow,
          },
        },
      }}
    />
  )
}
