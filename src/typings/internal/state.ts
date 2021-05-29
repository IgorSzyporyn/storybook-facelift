import type { ThemeVars } from '@storybook/theming'
import type {
  ThemeInstanciated,
  ThemeOptions,
  ThemeConverterFn,
  ThemeProviderType,
  ThemeVariantType,
} from './common'
import type { AddonParameters, ParamTheme } from './parameters'

export type AddonStateOptionThemes = Partial<Record<ThemeVariantType, ThemeOptions>>

export type AddonStateInstanciatedThemes = Partial<Record<ThemeVariantType, ThemeInstanciated>>

export type AddonStateStorybookThemeOptions = Partial<Record<ThemeVariantType, ThemeVars>>

export type AddonStateThemeTitles = Record<string, string>

export type AddonStateConverters = Record<string, ThemeConverterFn>

export type AddonStateTheme = Omit<ParamTheme, 'variants'> & {
  instanciated: AddonStateInstanciatedThemes
  options: AddonStateOptionThemes
  storybook: AddonStateStorybookThemeOptions
}

export type AddonStateThemes = {
  [key: string]: AddonStateTheme
}

export type AddonState = {
  parameters: AddonParameters
  initialized: boolean
  themes: AddonStateThemes
  converters: AddonStateConverters
  themeTitles: AddonStateThemeTitles
  providerThemeKey?: string
  providerKey?: ThemeProviderType
  themeKey?: string
  themeVariant?: ThemeVariantType
}
