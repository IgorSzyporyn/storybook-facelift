import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import * as Parameters from './parameters'
import { Config } from '.'

declare type AddonState = {
  theme?: StorybookThemeOptions
  themeOriginal?: Parameters.ThemeOriginal
  themeType?: Parameters.ThemeTypes
  themeName: string
  themeVariant: Parameters.ThemeVariantTypes
  themeInstanciated?: Config.ThemeInstanciatedType
}
