import { convert, create } from '@storybook/theming'
import { getNativeBackgroundColors } from './get-native-background-colors'

import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeConverterFnProps } from '../typings/internal/parameters'

export function createStorybookThemeFromNative({
  theme: _themeOptions,
  override,
  variant,
  background,
}: ThemeConverterFnProps) {
  if (_themeOptions === undefined) {
    return null
  }

  const themeVars = { ..._themeOptions, ...(override || {}) } as StorybookThemeOptions

  themeVars.base = variant
  const { appBg, appContentBg } = getNativeBackgroundColors(themeVars, background)

  let theme = create(themeVars)
  theme.appBg = appBg
  theme.appContentBg = appContentBg
  theme.barBg = appContentBg

  theme = create(theme)
  const instanciated = convert(theme)

  return { converted: theme, original: themeVars, instanciated }
}
