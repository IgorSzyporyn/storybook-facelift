import { ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import { Config } from './config'

// Type for allowed override configurations
declare type StorybookThemeOverride = Pick<
  StorybookThemeOptions,
  'brandTitle',
  'brandImage',
  'brandUrl'
>

// PARAMETER "STORY"

declare type StoryEntryTypes = 'palette' | 'typography'

declare type Story = {
  title?: string
  path?: string
  show?: boolean
}

declare type StoryEntries = {
  [key in StoryEntryTypes]: Story | false
}

declare type Stories = {
  title?: string
  entries?: StoryEntries
}

// PARAMETER "DOCS"
// SET CONFIG FOR DOCS ADDON

declare type DocsTypes = 'simple' | 'full'

declare type Docs = {
  // Set to true (default false) to hide the borders where type info is shown
  hidePropertyBorders?: boolean
  // Set to true (default false) to hide description values in docs table (@NEW)
  hideDescription?: boolean
  // Set to true (default false) to hide default values in docs table (@NEW)
  hideDefaults?: boolean
  // Set to true to hide the sibling stories shown below property table
  hideStories?: boolean
  // Set to either full or simple - full is default, and simple will ONLY show type info
  // and not any stories etc..
  type?: DocsTypes
}

// PARAMETER "NATIVE"
// SET CONFIG FOR THE NATIVE THEME

declare type Native = {
  // Ability to influense the native theme settings
  override?: StorybookThemeOverride
  // Title to show in the menu picker
  title?: string
  // Array to override showing both light and dark (default) ["dark"]
  variants?: ThemeVariantTypes[]
  // Ability to set the background type for native as with other themes in parameters
  background?: ThemeBackgroundsTypes
}

// PARAMETER "UI"
// SET CONFIG FOR UI RELATED SETTINGS

declare type UIElevationTypes = 0 | 1 | 2 | 3

declare type UI = {
  // How much to elevate the content panel
  elevation?: UIElevationTypes
  // Ability to override SB's own preview panel padding
  padding?: string
  // Ability to use a custom css box-shadow string for content elevation
  shadow?: string
}

// PARAMETER "THEMES"
// CONFIGURATION OF OBJECTS USED IN THEME ARRAY FOR PARAMETERS

// The two variant types supported
declare type ThemeVariantTypes = 'light' | 'dark'
// The two theme types supported internally (Storybook & Material UI)
declare type ThemeTypes = 'native' | 'mui'
// Type for variant configuration given for light or dark
declare type ThemeVariant = MuiThemeOptions | StorybookThemeOptions
// Courtesy type to make code and types in places less ambigious as
// original type is used for multiple purposes
declare type ThemeOriginal = ThemeVariant
// Only allow supported variants as keys in variant property
declare type ThemeVariants = {
  [key in ThemeVariantTypes]: ThemeVariant
}
// Property to control the way app and content colors are used in storybook
// App is base color, and content is the color used for the preview panel
declare type ThemeBackgroundsTypes =
  | 'normal'
  | 'reverse'
  | 'equal'
  | 'equal-reverse'
  | 'equal-app'
  | 'equal-content'

declare type Theme = {
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

// Properties the converter function will recieve as argument
declare type ThemeConverterProps = {
  override?: StorybookThemeOptions
  theme: MuiThemeOptions | StorybookThemeOptions
  variant: ThemeVariantTypes
  background?: ThemeBackgroundsTypes
  responsiveFontSizes?: boolean
}

// Values the converter function can return
declare type ThemeConverterResponse = {
  converted: StorybookThemeOptions
  original: ThemeOriginal
  instanciated: Config.ThemeInstanciatedType
}

// The type for the converter function itself
declare type ThemeConverter = (props: ThemeConverterProps) => null | ThemeConverterResponse

// The type for the parameters
declare type ThemeConverters = {
  [key: string]: ThemeConverter | undefined
}

// Type used for the addon state
declare type AddonParameters = {
  // Should the story component previewed use the shown theme's values
  // Note: Only works with Material UI themes and if withFacelift decorator is added
  autoThemeStory?: boolean
  // What theme to show as default - if no theme has been set then the first one in the
  // themes configuration parameter will be used (if includeNative is set, then this will be used)
  defaultTheme: string
  // Default variant (light of dark) to use - if not set will set to light unless browser is in dark mode
  defaultVariant: ThemeVariantTypes
  // Configuration for the Docs page
  docs: Docs
  // Setting that will fix a lot of minor css errors, ensure contrast ratios in text (themes can have weird colors),
  // pimp up the UI, and allow usage of the "ui" parameter
  enhanceUi: boolean
  // If themes parameter is set then you can disable the usage of the native theme by setting this to true
  includeNative: boolean
  // Configure settings for the native theme (title in picker, variants to show etc..)
  native?: Native
  // Override the used storybook theme configuration with these settings
  // Easy place to set the brandTitle and ensure that it is shown across all themes
  // Note: Each theme can in turn also override these settings
  override?: StorybookThemeOverride
  // Configure what available stories in the toolbox should be used
  // Note only MUI themes have toolbox stories for now
  stories?: boolean | Stories
  // Converters functions used to convert themes in parameters into Storybook themes
  // Note: "native" & "mui" are protected
  themeConverters: ThemeConverters
  themes?: Theme[]
  ui: UI
}

// Type used for parameters from storybook
// Either from preview.(t|j)s or from story
declare type ApiParameters = {
  autoThemeStory?: boolean
  defaultTheme?: string
  defaultVariant?: ThemeVariantTypes
  docs?: Docs
  enhanceUi?: boolean
  includeNative?: boolean
  native?: Native
  override?: StorybookThemeOverride
  stories?: boolean | Stories
  themeConverters?: ThemeConverters
  themes?: Theme[]
  ui?: UI
}

// Type used for allowed parameters from stories
declare type CustomParameters = {
  autoThemeStory?: boolean
  docs?: Docs
  enhanceUi?: boolean
  ui?: UI
  override?: StorybookThemeOverride
}

// Type for the default parameters
declare type DefaultParameters = {
  autoThemeStory: boolean
  defaultTheme: string
  docs: Docs
  enhanceUi: boolean
  includeNative: boolean
  ui: UI
}
