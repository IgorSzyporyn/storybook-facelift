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
}

// Parameter "main"
declare type MainElevationTypes = 0 | 1 | 2 | 3

declare type Main = {
  elevation?: MainElevationTypes
  padding?: string
  shadow?: string
}

// Parameter "theme"
declare type ThemeVariantTypes = 'light' | 'dark'
declare type ThemeTypes = 'native' | 'mui' | 'mui-options'
declare type ThemeOriginal = MuiTheme | ThemeVars

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
}

declare type ThemeConverterProps = {
  override?: ThemeVars
  theme: MuiTheme | MuiThemeOptions | ThemeVars
  variant: ThemeVariantTypes
  background?: ThemeBackgroundsTypes
}

declare type ThemeConverterValues = {
  converted: ThemeVars
  original: ThemeOriginal
}

declare type ThemeConverter = (props: ThemeConverterProps) => null | ThemeConverterValues

declare type ThemeConverters = {
  [key: string]: ThemeConverter | undefined
}

declare type Override = Omit<ThemeVars, 'base'>

declare type AddonParameters = {
  defaultTheme: string
  defaultVariant: ThemeVariantTypes
  docs: Docs
  enhanceUi: boolean
  includeNative: boolean
  main: Main
  native?: Native
  override?: Override
  stories?: boolean | Story[]
  themeConverters: ThemeConverters
  themes?: Theme[]
}

declare type ApiParameters = {
  defaultTheme?: string
  defaultVariant?: ThemeVariantTypes
  docs?: Docs
  enhanceUi?: boolean
  includeNative?: boolean
  main?: Main
  native?: Native
  override?: Override
  stories?: boolean | Story[]
  themeConverters?: ThemeConverters
  themes?: Theme[]
}

declare type CustomParameters = {
  docs?: Docs
  enhanceUi?: boolean
  main?: Main
  override?: Override
}

declare type DefaultParameters = {
  defaultTheme: string
  docs: Docs
  enhanceUi: boolean
  includeNative: boolean
  main: Main
}
