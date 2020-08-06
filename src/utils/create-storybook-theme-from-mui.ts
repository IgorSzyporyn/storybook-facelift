import { create, themes } from '@storybook/theming'
import { Parameters } from '../typings'
import { Theme } from '@material-ui/core'
import { getMuiBackgroundKeys } from './get-mui-background-keys'

export function createStorybookThemeFromMui({
  theme: _theme,
  override,
  variant,
  background,
}: Parameters.ThemeConverterProps) {
  if (_theme === undefined) {
    return null
  }

  const theme = _theme as Theme
  const defaultThemeValues = themes[variant]
  const { appBg, appContentBg } = getMuiBackgroundKeys(background)

  const themeValue = {
    ...defaultThemeValues,

    colorPrimary: theme.palette.primary.main,
    colorSecondary: theme.palette.secondary.main,

    // UI
    appBg: theme.palette.background[appBg],
    appContentBg: theme.palette.background[appContentBg],
    // appBorderColor: theme.palette.text.primary,
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
    barBg: theme.palette.background[appContentBg],

    // Form color
    inputBg: theme.palette.background.paper,
    inputBorder: theme.palette.secondary.main,
    inputTextColor: theme.palette.text.primary,
    inputBorderRadius: theme.shape.borderRadius,

    ...(override || {}),

    base: variant,
  }

  const themeVars = create(themeValue)

  return { converted: themeVars, original: theme }
}
