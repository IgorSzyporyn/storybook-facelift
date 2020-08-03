import { ThemeOptions } from '@material-ui/core'
import { create, themes } from '@storybook/theming'
import { Parameters } from '../typings'
import { createMuiTheme } from './create-mui-theme'

export function createStorybookThemeOptionsFromMuiOptions({
  theme: _themeOptions,
  override,
  variant,
}: Parameters.ParameterThemeConverterProps) {
  if (_themeOptions === undefined) {
    return null
  }

  const themeOptions = _themeOptions as ThemeOptions

  if (!themeOptions.palette) {
    themeOptions.palette = { type: variant }
  } else if (!themeOptions.palette.type) {
    themeOptions.palette.type = variant
  }

  const theme = createMuiTheme(themeOptions)

  const defaultThemeValues = themes[variant]

  const themeValue = {
    ...defaultThemeValues,

    colorPrimary: theme.palette.primary.main,
    colorSecondary: theme.palette.secondary.main,

    // UI
    appBg: theme.palette.background.paper,
    appContentBg: theme.palette.background.default,
    appBorderColor: theme.palette.background.paper,
    appBorderRadius: theme.shape.borderRadius,

    // Typography
    fontBase: theme.typography.fontFamily,
    fontCode: 'monospace',

    // Text colors
    textColor: theme.palette.text.primary,
    textInverseColor: theme.palette.text.secondary,

    // Toolbar default and active colors
    barTextColor: theme.palette.text.secondary,
    barSelectedColor: theme.palette.secondary.main,
    barBg: theme.palette.background.default,

    // Form color
    inputBg: theme.palette.background.paper,
    inputBorder: theme.palette.secondary.main,
    inputTextColor: theme.palette.text.primary,
    inputBorderRadius: theme.shape.borderRadius,

    ...(override || {}),
  }

  const themeVars = create(themeValue)

  return { converted: themeVars, original: theme }
}
