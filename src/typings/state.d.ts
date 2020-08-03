import * as Parameters from './parameters'
import { ThemeVars } from '@storybook/theming'

declare type AddonState = {
  theme?: ThemeVars
  themeOriginal?: Parameters.ThemeOriginal
  themeType?: Parameters.ThemeTypes
  themeName: string
  themeVariant: Parameters.ThemeVariantTypes
}
