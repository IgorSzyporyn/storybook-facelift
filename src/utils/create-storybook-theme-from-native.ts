import { create, ThemeVars } from '@storybook/theming'
import { Parameters } from '../typings'

export function createStorybookThemeFromNative({
  theme: _theme,
  override,
}: Parameters.ThemeConverterProps) {
  if (_theme === undefined) {
    return null
  }

  const theme = { ..._theme, ...(override || {}) } as ThemeVars
  const themeVars = create(theme)

  return { converted: themeVars, original: theme }
}
