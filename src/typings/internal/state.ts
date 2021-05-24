import type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import type { ThemeOptions, ThemeProviderType, ThemeType, ThemeVariantType } from './parameters'
import type { ThemeInstanciatedType } from './config'

export type AddonState = {
  theme?: StorybookThemeOptions
  original?: ThemeOptions
  type?: ThemeType
  name: string
  variant: ThemeVariantType
  intanciated?: ThemeInstanciatedType
  provider?: ThemeProviderType
  providerTheme?: string
}
