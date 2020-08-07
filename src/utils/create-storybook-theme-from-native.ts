import { create, ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import { Parameters } from '../typings'
import { getNativeBackgroundColors } from './get-native-background-colors'

export function createStorybookThemeFromNative({
  theme: _theme,
  override,
  variant,
  background,
}: Parameters.ThemeConverterProps) {
  if (_theme === undefined) {
    return null
  }

  const theme = { ..._theme, ...(override || {}) } as StorybookThemeOptions
  const themeVars = create(theme)

  themeVars.base = variant
  const { appBg, appContentBg } = getNativeBackgroundColors(theme, background)

  themeVars.appBg = appBg
  themeVars.appContentBg = appContentBg
  themeVars.barBg = appContentBg

  return { converted: themeVars, original: theme }
}
