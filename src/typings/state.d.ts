import * as Parameters from './parameters'
import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import { Config } from '../typings'

declare type AddonState = {
  theme?: StorybookThemeOptions
  themeOriginal?: Parameters.ThemeOriginal
  themeType?: Parameters.ThemeTypes
  themeName: string
  themeVariant: Parameters.ThemeVariantTypes
  themeInstanciated?: Config.ThemeInstanciatedType
}
