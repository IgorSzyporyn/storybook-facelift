import { convert, create } from '@storybook/theming'
import { getNativeBackgroundColors } from './get-native-background-colors'

import type { ThemeVars as StorybookThemeConfig } from '@storybook/theming'
import type { ThemeConverterFnProps, ThemeConverterFnResult } from '../typings/internal/common'

export function createStorybookThemeFromNative({
  theme,
  override,
  variant,
  background,
}: ThemeConverterFnProps): ThemeConverterFnResult {
  if (theme === undefined) {
    return null
  }

  const options = { ...theme, ...(override || {}) } as StorybookThemeConfig

  options.base = variant
  const { appBg, appContentBg } = getNativeBackgroundColors(options, background)

  let storybook = create(options)
  storybook.appBg = appBg
  storybook.appContentBg = appContentBg
  storybook.barBg = appContentBg

  storybook = create(storybook)
  const instanciated = convert(storybook)

  return { storybook, options, instanciated }
}
