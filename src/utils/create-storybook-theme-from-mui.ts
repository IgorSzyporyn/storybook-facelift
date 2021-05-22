import { ThemeOptions } from '@material-ui/core'
import { create, themes } from '@storybook/theming'
import { createMuiTheme } from './create-mui-theme'
import { getMuiBackgroundKeys } from './get-mui-background-keys'

import type { ThemeConverterFnProps } from '../typings/parameters'

export function createStorybookThemeOptionsFromMui(converterProps: ThemeConverterFnProps) {
  // @TODO - Do not destructure the argument given
  // Then remove this proxy object
  const { theme: _original, override, variant, background } = converterProps

  // Bail out early
  if (_original === undefined) {
    return null
  }

  const original = _original as ThemeOptions

  if (!original.palette) {
    original.palette = { type: variant }
  } else if (!original.palette.type) {
    original.palette.type = variant
  }

  const instanciated = createMuiTheme(original, converterProps)
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

    ...(override || {}),

    base: variant,
  }

  const converted = create(themeValue)

  return { converted, original, instanciated }
}
