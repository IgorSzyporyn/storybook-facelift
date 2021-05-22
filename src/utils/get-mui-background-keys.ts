import type { ThemeBackgroundsTypes } from '../types/parameters'

type BackgroundKeyTypes = 'default' | 'paper'

export function getMuiBackgroundKeys(background?: ThemeBackgroundsTypes) {
  let appBg: BackgroundKeyTypes = 'paper'
  let appContentBg: BackgroundKeyTypes = 'default'

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
        appBg = 'default'
        appContentBg = 'paper'
        break
      default:
        break
    }
  }

  return { appBg, appContentBg }
}
