import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeVariant, ThemeTypes, ThemeVariantTypes } from './parameters'
import type { ThemeInstanciatedType } from './config'

export type AddonState = {
  theme?: StorybookThemeOptions
  themeOriginal?: ThemeVariant
  themeType?: ThemeTypes
  themeName: string
  themeVariant: ThemeVariantTypes
  themeInstanciated?: ThemeInstanciatedType
}
