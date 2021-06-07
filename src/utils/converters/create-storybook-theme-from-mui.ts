import { ThemeOptions as MuiThemeConfig } from '@material-ui/core'
import { create, themes } from '@storybook/theming'
import { createMuiTheme } from '../create-mui-theme'
import { getMuiBackgroundKeys } from '../get-mui-background-keys'

import type { ThemeConverterFnProps, ThemeConverterFnResult } from '../../typings/internal/common'

export function createStorybookThemeOptionsFromMui(
  props: ThemeConverterFnProps
): ThemeConverterFnResult {
  const { theme, override, variant, background } = props

  // Bail out early
  if (theme === undefined) {
    return null
  }

  const options = theme as MuiThemeConfig

  if (!options.palette) {
    options.palette = { type: variant }
  } else if (!options.palette.type) {
    options.palette.type = variant
  }

  const instanciated = createMuiTheme(options, props)
  const defaultThemeValues = themes[variant]

  const { appBg, appContentBg } = getMuiBackgroundKeys(background)

  const themeValue = {
    ...defaultThemeValues,

    colorPrimary: instanciated.palette.primary.main,
    colorSecondary: instanciated.palette.secondary.main,

    // UI
    appBg: instanciated.palette.background[appBg],
    appContentBg: instanciated.palette.background[appContentBg],
    // appBorderColor: theme.palette.background.paper,
    appBorderRadius: instanciated.shape.borderRadius,

    // Typography
    fontBase: instanciated.typography.fontFamily,
    fontCode: 'monospace',

    // Text colors
    textColor: instanciated.palette.text.primary,
    textInverseColor: instanciated.palette.text.secondary,

    // Toolbar default and active colors
    barTextColor: instanciated.palette.text.secondary,
    barSelectedColor: instanciated.palette.secondary.main,
    barBg: instanciated.palette.background[appContentBg],

    // Form color
    // inputBg: instanciated.palette.background.paper,
    // inputBorder: instanciated.palette.secondary.main,
    // inputTextColor: instanciated.palette.text.primary,
    inputBorderRadius: instanciated.shape.borderRadius,

    ...override,

    base: variant,
  }

  const storybook = create(themeValue)

  return { storybook, options, instanciated }
}
