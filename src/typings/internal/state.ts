import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeOptions, ThemeTypes, ThemeVariantTypes } from './parameters'
import type { ThemeInstanciatedType } from './config'

export type AddonState = {
  theme?: StorybookThemeOptions
  themeOriginal?: ThemeOptions
  themeType?: ThemeTypes
  themeName: string
  themeVariant: ThemeVariantTypes
  themeInstanciated?: ThemeInstanciatedType
}
