import { Parameters } from '../typings'
import { ThemeVars } from '@storybook/theming'

export function getNativeBackgroundColors(
  theme: ThemeVars,
  background?: Parameters.ThemeBackgroundsTypes
) {
  let appBg = theme.appBg
  let appContentBg = theme.appContentBg

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
