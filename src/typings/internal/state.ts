import type {
  ThemeInstanciated,
  ThemeOptions,
  ThemeConverterFn,
  ThemeProviderType,
  ThemeVariantType,
} from './common'
import type { StorybookThemeOptions } from './exposed'
import type { AddonParameters, ParamTheme } from './parameters'

export type AddonStateOptionThemes = Partial<Record<ThemeVariantType, ThemeOptions>>

export type AddonStateInstanciatedThemes = Partial<Record<ThemeVariantType, ThemeInstanciated>>

export type AddonStateStorybookThemeOptions = Partial<
  Record<ThemeVariantType, StorybookThemeOptions>
>

export type AddonStateThemeTitles = Record<string, string>

export type AddonStateConverters = Record<string, ThemeConverterFn>

export type AddonStateTheme = Omit<ParamTheme, 'variants'> & {
  instanciated: AddonStateInstanciatedThemes
  options: AddonStateOptionThemes
  storybook: AddonStateStorybookThemeOptions
}

export type AddonStateThemes = Record<string, AddonStateTheme>

export type AddonState = {
  parameters: AddonParameters
  initialized: boolean
  themes: AddonStateThemes
  converters: AddonStateConverters
  themeTitles: AddonStateThemeTitles
  providerTheme?: string
  provider?: ThemeProviderType
  themeKey?: string
  themeVariant?: ThemeVariantType
}
