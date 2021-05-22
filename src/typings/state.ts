import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeOriginal, ThemeTypes, ThemeVariantTypes } from './parameters'
import type { ThemeInstanciatedType } from './config'

export type AddonState = {
  theme?: StorybookThemeOptions
  themeOriginal?: ThemeOriginal
  themeType?: ThemeTypes
  themeName: string
  themeVariant: ThemeVariantTypes
  themeInstanciated?: ThemeInstanciatedType
}
