import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import { ThemeVars } from '@storybook/theming'

// PARAMETER "story"
declare type StoryTypes = 'palette' | 'typography'

declare type Story = {
  name: StoryTypes
  path?: string
  show?: boolean
}

// Parameter "docs"
declare type DocsTypes = 'simple' | 'full'

declare type Docs = {
  hidePropertyBorders?: boolean
  type?: DocsTypes
}

// Parameter "native"
declare type Native = {
  override?: ThemeVars
  title?: string
  variants?: ThemeVariantTypes[]
  background?: ThemeBackgroundsTypes
}

// Parameter "main"
declare type UIElevationTypes = 0 | 1 | 2 | 3

declare type UI = {
  elevation?: UIElevationTypes
  padding?: string
  shadow?: string
}

// Parameter "theme"
declare type ThemeVariantTypes = 'light' | 'dark'
declare type ThemeTypes = 'native' | 'mui'
declare type ThemeOriginal = MuiThemeOptions | ThemeVars

declare type ThemeTypeWithOverride = {
  override?: ThemeVars
  theme: MuiTheme | ThemeVars
}

declare type ThemeVariant = ThemeOriginal & ThemeTypeWithOverride

declare type ThemeVariants = {
  [key in ThemeVariantTypes]: ThemeVariant
}

declare type ThemeBackgroundsTypes =
  | 'normal'
  | 'reverse'
  | 'equal'
  | 'equal-reverse'
  | 'equal-app'
  | 'equal-content'

declare type Theme = {
  key: string
  override?: ThemeVars
  title: string
  background?: ThemeBackgroundsTypes
  type: ThemeTypes
  variants: ThemeVariants
  previewOnly?: boolean
}

declare type ThemeConverterProps = {
  override?: ThemeVars
  theme: MuiThemeOptions | ThemeVars
  variant: ThemeVariantTypes
  background?: ThemeBackgroundsTypes
}

declare type ThemeConverterValues = {
  converted: ThemeVars
  original: ThemeOriginal
  instanciated: MuiTheme | ThemeVars
}

declare type ThemeConverter = (props: ThemeConverterProps) => null | ThemeConverterValues

declare type ThemeConverters = {
  [key: string]: ThemeConverter | undefined
}

declare type Override = Omit<ThemeVars, 'base'>

declare type AddonParameters = {
  autoThemeStory?: boolean
  defaultTheme: string
  defaultVariant: ThemeVariantTypes
  docs: Docs
  enhanceUi: boolean
  includeNative: boolean
  native?: Native
  override?: Override
  stories?: boolean | Story[]
  themeConverters: ThemeConverters
  themes?: Theme[]
  ui: UI
}

declare type ApiParameters = {
  autoThemeStory?: boolean
  defaultTheme?: string
  defaultVariant?: ThemeVariantTypes
  docs?: Docs
  enhanceUi?: boolean
  includeNative?: boolean
  native?: Native
  override?: Override
  stories?: boolean | Story[]
  themeConverters?: ThemeConverters
  themes?: Theme[]
  ui?: UI
}

declare type CustomParameters = {
  autoThemeStory?: boolean
  docs?: Docs
  enhanceUi?: boolean
  ui?: UI
  override?: Override
}

declare type DefaultParameters = {
  autoThemeStory: boolean
  defaultTheme: string
  docs: Docs
  enhanceUi: boolean
  includeNative: boolean
  ui: UI
}
