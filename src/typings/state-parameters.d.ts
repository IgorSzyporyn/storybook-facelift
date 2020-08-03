import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import { ThemeVars as StorybookThemeVars } from '@storybook/theming'

declare type ParameterStoryTypes = 'palette' | 'typography'

declare type ParameterStory = {
  name: ParameterStoryTypes
  show?: boolean
  path?: string
}

declare type ParameterThemeVariantTypes = 'light' | 'dark'

declare type ParameterThemeTypes = 'native' | 'mui' | 'mui-options'

declare type ParameterThemeTypeWithOverride = {
  theme: MuiTheme | StorybookThemeVars
  override?: StorybookThemeVars
}

declare type ParameterThemeOriginal = MuiTheme | StorybookThemeVars

declare type ParameterThemeVariant = ParameterThemeOriginal & ParameterThemeTypeWithOverride

declare type ParameterThemeVariants = {
  [key in ParameterThemeVariantTypes]: ParameterThemeVariant
}

declare type ParameterTheme = {
  key: string
  title: string
  type: ParameterThemeTypes
  override?: StorybookThemeVars
  variants: ParameterThemeVariants
}

declare type ParameterDocsTypes = 'simple' | 'full'

declare type ParameterThemeConverterProps = {
  theme: MuiTheme | MuiThemeOptions | StorybookThemeVars
  override?: StorybookThemeVars
  variant: ParameterThemeVariantTypes
}

declare type ParameterThemeConverterValues = {
  converted: StorybookThemeVars
  original: ParameterThemeOriginal
}

declare type ParameterThemeConverterResult = null | ParameterThemeConverterValues

declare type ParameterThemeConverter = (
  props: ParameterThemeConverterProps
) => ParameterThemeConverterResult

declare type ParameterMainElevationTypes = 0 | 1 | 2 | 3

declare type ParameterMain = {
  elevation?: ParameterMainElevationTypes
  shadow?: string
}

declare type ParameterNative = {
  title?: string
  variants?: ParameterThemeVariantTypes[]
  override?: StorybookThemeVars
}

declare type ParameterThemeConverters = {
  [key: string]: ParameterThemeConverter
}

declare type Parameters = {
  _initialized: boolean
  defaultTheme: string
  defaultVariant: ParameterThemeVariantTypes
  includeNative: boolean
  native: false | ParameterNative
  override: false | StorybookThemeVars
  main: ParameterMain
  docs: ParameterDocsTypes
  stories: boolean | ParameterStory[]
  themes: false | ParameterTheme[]
  themeConverters: ParameterThemeConverters
}
