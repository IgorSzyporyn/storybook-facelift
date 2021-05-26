import type {
  ThemeOptionsOverride,
  ThemeBackgroundsTypes,
  ThemeConverterFn,
  ThemeProviderType,
  ThemeType,
  ThemeVariants,
  ThemeVariantType,
} from './common'

/**
 * Types used for parameter "docs"
 *
 */
export type ParamDocsType = 'simple' | 'full'

export type ParamDocs = {
  hidePropertyBorders?: boolean
  hideDescription?: boolean
  hideDefaults?: boolean
  hideStories?: boolean
  hideControls?: boolean
  type?: ParamDocsType
}

/**
 * Types used for parameter "ui"
 *
 */
export type ParamUiElevationTypes = 0 | 1 | 2 | 3 | 4

export type ParamUi = {
  elevation?: ParamUiElevationTypes
  padding?: string
  shadow?: string
}

/**
 * Types used for parameter "native"
 *
 */

export type ParamNative = {
  override?: ThemeOptionsOverride
  title?: string
  variants?: ThemeVariantType[]
  background?: ThemeBackgroundsTypes
}

/**
 * Types used for parameter "themes"
 *
 */

export type ParamTheme = {
  key: string
  title: string
  variants: ThemeVariants
  type: ThemeType
  background?: ThemeBackgroundsTypes
  override?: ThemeOptionsOverride
  provider?: ThemeProviderType
  providerTheme?: string
  providerOnly?: boolean
  resposiveFontSizes?: boolean
  converter?: string
}

/**
 * Types used for parameter themeConverters
 *
 */

export type ParamThemeConverters = Record<string, ThemeConverterFn>

/**
 * Main parameters type
 *
 */

export type AddonParameters = {
  addProvider?: boolean
  provider?: ThemeProviderType
  providerTheme?: string
  defaultTheme?: string
  defaultVariant?: ThemeVariantType
  docs?: ParamDocs
  enhanceUi?: boolean
  includeNative?: boolean
  native?: ParamNative
  override?: ThemeOptionsOverride
  themeConverters?: ParamThemeConverters
  themes?: ParamTheme[]
  ui?: ParamUi
}
