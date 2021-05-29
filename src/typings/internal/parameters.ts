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
 * ### Storybook Facelift
 * Parameters for Storybook Facelift
 */
export type AddonParameters = {
  /**
   * @deprecated use addProvider
   */
  autoThemeStory?: boolean
  /**
   * Automatically wrap your stories in a theme provider from Material UI,
   * Styled Components or Emotion
   */
  addProvider?: boolean
  /**
   * The default provider to wrap your stories with (mui, styled or emotion)
   */
  provider?: ThemeProviderType
  /**
   * Key for your default theme used for theme provider
   */
  providerTheme?: string
  /**
   * Key for your default theme for Storybook
   */
  defaultTheme?: string
  /**
   * Default variant to show (light or dark)
   */
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

export type StoryParameters = Pick<
  AddonParameters,
  | 'addProvider'
  | 'autoThemeStory'
  | 'provider'
  | 'providerTheme'
  | 'docs'
  | 'enhanceUi'
  | 'override'
  | 'ui'
>
