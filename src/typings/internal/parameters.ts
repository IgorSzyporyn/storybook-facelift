import { ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import { ThemeOptions as BadgerThemeOptions } from 'badger-ui'

import type { ThemeInstanciatedType } from './config'

// Utility type for storybook theme overrides in various parameter types
export type StorybookThemeOverride = Pick<
  StorybookThemeOptions,
  'brandTitle' | 'brandImage' | 'brandUrl'
>

export type ThemeVariantTypes = 'light' | 'dark'
export type ThemeTypes = 'native' | 'mui' | 'styled' | 'badgerui' | 'cylindo'
export type ThemeVariant = MuiThemeOptions | StorybookThemeOptions | BadgerThemeOptions
export type ThemeVariants = { [key in ThemeVariantTypes]: ThemeVariant }
export type ThemeBackgroundsTypes =
  | 'normal'
  | 'reverse'
  | 'equal'
  | 'equal-reverse'
  | 'equal-app'
  | 'equal-content'

// PARAMETERS.DOCS
// Control the UI of the docs tab
// --------------------------------------------------------------------------------
export type ParamDocsType = 'simple' | 'full'

export type ParamDocs = {
  // Set to true (default false) to hide the borders where type info is shown
  hidePropertyBorders?: boolean
  // Set to true (default false) to hide description values in docs table (@NEW)
  hideDescription?: boolean
  // Set to true (default false) to hide default values in docs table (@NEW)
  hideDefaults?: boolean
  // Set to true to hide the sibling stories shown below property table
  hideStories?: boolean
  //
  hideControls?: boolean
  // Set to either full or simple - full is default, and simple will ONLY show type info
  // and not any stories etc..
  type?: ParamDocsType
}

// PARAMETERS.UI
// Overall control of the UI
// --------------------------------------------------------------------------------
export type ParamUIElevationTypes = 0 | 1 | 2 | 3 | 4

export type ParamUI = {
  // How much to elevate the content panel
  elevation?: ParamUIElevationTypes
  // Ability to override SB's own preview panel padding
  padding?: string
  // Ability to use a custom css box-shadow string for content elevation
  shadow?: string
}

// PARAMETERS.UI
// Overall control of the UI
// --------------------------------------------------------------------------------

// PARAMETERS.NATIVE
// Take control over the native Storybook theme
// --------------------------------------------------------------------------------

export type ParamNative = {
  // Ability to influense the native theme settings
  override?: StorybookThemeOverride
  // Title to show in the menu picker
  title?: string
  // Array to override showing both light and dark (default) ["dark"]
  variants?: ThemeVariantTypes[]
  // Ability to set the background type for native as with other themes in parameters
  background?: ThemeBackgroundsTypes
}

// PARAMETERS.THEMES (array of Theme)
// Define custom themes of allowed types to use
//
// Supports Storybok, Material UI, Cylindo & Styled Components (requires a custom
// themeConverter called "styled" and will provide a ThemeProvider context for
// story components)
// --------------------------------------------------------------------------------

export type ParamTheme = {
  // Unique key for this theme entry
  key: string
  // Override the Storybook theme used with these settings
  // Good for special brandTitle etc..
  override?: StorybookThemeOptions
  // The title used in the theme picker
  title: string
  // Ability to configure how backgrounds are used in the Storybook theme
  // 'reverse' will swap between app and content etc..
  background?: ThemeBackgroundsTypes
  // The theme type being used
  // Note: For now only 'native' (Storybook Theme Options) and "mui" (Material UI Theme Options)
  // are supported - also note that instanciated MUI Theme Options are not supported.
  type: ThemeTypes
  // Variants config with a "light" or "dark" property - these are the theme options which will be
  // used for the theme in each chosen variant.
  variants: ThemeVariants
  // This theme is for the toolbox preview mode only and will make the theme not show in theme picker
  // Note: Only supported for Material UI themes for now
  previewOnly?: boolean
  // This is for typography - use responsive font sizes or not
  // Note: Default is false
  resposiveFontSizes?: boolean
}

// PARAMETER "CONVERTERS"
// KEY VALUE MAP FOR USED THEME OPTIONS -> STORYBOOK THEME CONVERTER FUNCTIONS
// NOTE THAT KEYS "native" & "mui" ARE PROTECTED

// PARAMETERS.THEMES (array of Theme)
// Define custom themes of allowed types to use
//
// Supports Storybok, Material UI, Cylindo & Styled Components (requires a custom
// themeConverter called "styled" and will provide a ThemeProvider context for
// story components)
// --------------------------------------------------------------------------------

// Properties the converter function will recieve as argument
export type ThemeConverterFnProps<T = Record<string, unknown>> = {
  override?: StorybookThemeOptions
  theme: ThemeVariant | T
  variant: ThemeVariantTypes
  background?: ThemeBackgroundsTypes
  responsiveFontSizes?: boolean
}

// Values the converter function can return
export type ThemeConverterFnResult = {
  converted: StorybookThemeOptions
  original: ThemeVariant
  instanciated: ThemeInstanciatedType
}

export type ThemeConverterType = 'mui' | 'styled' | 'native' | 'badgerui' | 'cylindo'

// The type for the converter function itself
export type ThemeConverterFn = (props: ThemeConverterFnProps) => null | ThemeConverterFnResult

// The type for the parameters
export type ParamThemeConverters = Record<ThemeConverterType, ThemeConverterFn | undefined>

// Type used for the addon state
export type AddonStateParameters = {
  // Should the story component previewed use the shown theme's values
  // Note: Only works with Material UI themes and if withFacelift decorator is added
  autoThemeStory?: boolean
  // What theme to show as default - if no theme has been set then the first one in the
  // themes configuration parameter will be used (if includeNative is set, then this will be used)
  defaultTheme: string
  // Default variant (light of dark) to use - if not set will set to light unless browser is in dark mode
  defaultVariant: ThemeVariantTypes
  // Configuration for the Docs page
  docs: ParamDocs
  // Setting that will fix a lot of minor css errors, ensure contrast ratios in text (themes can have weird colors),
  // pimp up the UI, and allow usage of the "ui" parameter
  enhanceUi: boolean
  // If themes parameter is set then you can disable the usage of the native theme by setting this to true
  includeNative: boolean
  // Configure settings for the native theme (title in picker, variants to show etc..)
  native?: ParamNative
  // Override the used storybook theme configuration with these settings
  // Easy place to set the brandTitle and ensure that it is shown across all themes
  // Note: Each theme can in turn also override these settings
  override?: StorybookThemeOverride
  // Converters functions used to convert themes in parameters into Storybook themes
  // Note: "native" & "mui" are protected
  themeConverters: ParamThemeConverters
  themes?: ParamTheme[]
  ui: ParamUI
}

// Type used for parameters from storybook
// Either from preview.(t|j)s or from story
export type AddonParameters = {
  autoThemeStory?: boolean
  defaultTheme?: string
  defaultVariant?: ThemeVariantTypes
  docs?: ParamDocs
  enhanceUi?: boolean
  includeNative?: boolean
  native?: ParamNative
  override?: StorybookThemeOverride
  themeConverters?: ParamThemeConverters
  themes?: ParamTheme[]
  ui?: ParamUI
}

// Type used for allowed parameters from stories
export type StoryParameters = {
  autoThemeStory?: boolean
  docs?: ParamDocs
  enhanceUi?: boolean
  ui?: ParamUI
  override?: StorybookThemeOverride
}

// Type for the default parameters
export type DefaultParameters = {
  autoThemeStory: boolean
  defaultTheme: string
  docs: ParamDocs
  enhanceUi: boolean
  includeNative: boolean
  ui: ParamUI
  themeConverters: ParamThemeConverters
}
