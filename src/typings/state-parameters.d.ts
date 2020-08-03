import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import { ThemeVars } from '@storybook/theming'

// PARAMETER "story"
declare type StoryTypes = 'palette' | 'typography'

declare type Story = {
  name: StoryTypes
  show?: boolean
  path?: string
}


// Parameter "docs"
declare type DocsTypes = 'simple' | 'full'


// Parameter "native"
declare type Native = {
  title?: string
  variants?: ThemeVariantTypes[]
  override?: ThemeVars
}


// Parameter "main"
declare type MainElevationTypes = 0 | 1 | 2 | 3

declare type Main = {
  elevation?: MainElevationTypes
  shadow?: string
}


// Parameter "theme"
declare type ThemeVariantTypes = 'light' | 'dark'
declare type ThemeTypes = 'native' | 'mui' | 'mui-options'
declare type ThemeOriginal = MuiTheme | ThemeVars

declare type ThemeTypeWithOverride = {
  theme: MuiTheme | ThemeVars
  override?: ThemeVars
}

declare type ThemeVariant = ThemeOriginal & ThemeTypeWithOverride

declare type ThemeVariants = {
  [key in ThemeVariantTypes]: ThemeVariant
}

declare type Theme = {
  key: string
  title: string
  type: ThemeTypes
  override?: ThemeVars
  variants: ThemeVariants
}


// Parameter "themeConverters"
declare type ThemeConverterProps = {
  theme: MuiTheme | MuiThemeOptions | ThemeVars
  override?: ThemeVars
  variant: ThemeVariantTypes
}

declare type ThemeConverterValues = {
  converted: ThemeVars
  original: ThemeOriginal
}

declare type ThemeConverterResult = null | ThemeConverterValues

declare type ThemeConverter = (
  props: ThemeConverterProps
) => ThemeConverterResult


declare type ThemeConverters = {
  [key: string]: ThemeConverter
}


declare type Parameters = {
  _initialized: boolean
  defaultTheme: string
  defaultVariant: ThemeVariantTypes
  includeNative: boolean
  native: false | Native
  override: false | ThemeVars
  main: Main
  docs: DocsTypes
  stories: boolean | Story[]
  themes: false | Theme[]
  themeConverters: ThemeConverters
}
