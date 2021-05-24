import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeOptions, ThemeProviderType, ThemeType, ThemeVariantType } from './parameters'
import type { ThemeInstanciatedType } from './config'

export type AddonState = {
  theme?: StorybookThemeOptions
  themeOriginal?: ThemeOptions
  themeType?: ThemeType
  themeName: string
  themeVariant: ThemeVariantType
  themeInstanciated?: ThemeInstanciatedType
  provider?: ThemeProviderType
  providerTheme?: string
}
