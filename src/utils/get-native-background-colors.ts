import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeBackgroundsTypes } from '../typings/internal/parameters'

export function getNativeBackgroundColors(
  theme: StorybookThemeOptions,
  background?: ThemeBackgroundsTypes
) {
  let { appBg } = theme
  let { appContentBg } = theme

  if (background && background !== 'normal') {
    switch (background) {
      case 'equal':
      case 'equal-app':
        appContentBg = appBg
        break
      case 'equal-content':
        appBg = appContentBg
        break
      case 'equal-reverse':
        appBg = appContentBg
        break
      case 'reverse':
        appBg = theme.appContentBg
        appContentBg = theme.appBg
        break
      default:
        break
    }
  }

  return { appBg, appContentBg }
}
