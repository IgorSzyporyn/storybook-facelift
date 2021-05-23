import { convert, create } from '@storybook/theming'
import { getNativeBackgroundColors } from './get-native-background-colors'

import type { ThemeVars as StorybookThemeConfig } from '@storybook/theming'
import type { ThemeConverterFnProps, ThemeConverterFnResult } from '../typings/internal/parameters'

export function createStorybookThemeFromNative({
  theme,
  override,
  variant,
  background,
}: ThemeConverterFnProps): ThemeConverterFnResult {
  if (theme === undefined) {
    return null
  }

  const themeConfig = { ...theme, ...(override || {}) } as StorybookThemeConfig

  themeConfig.base = variant
  const { appBg, appContentBg } = getNativeBackgroundColors(themeConfig, background)

  let storybookThemeConfig = create(themeConfig)
  storybookThemeConfig.appBg = appBg
  storybookThemeConfig.appContentBg = appContentBg
  storybookThemeConfig.barBg = appContentBg

  storybookThemeConfig = create(storybookThemeConfig)
  const instanciated = convert(storybookThemeConfig)

  return {
    storybookThemeOptions: storybookThemeConfig,
    themeOptions: themeConfig,
    theme: instanciated,
  }
}
