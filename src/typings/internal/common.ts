import type { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import type { Theme as BadgerTheme, ThemeOptions as BadgerThemeOptions } from 'badger-ui'
import type {
  Theme as StorybookTheme,
  ThemeVars as StorybookThemeOptions,
} from '@storybook/theming'

export type ThemeVariantType = 'light' | 'dark'

export type ThemeType = 'native' | 'mui' | 'badgerui' | 'custom'

export type ThemeProviderType = 'mui' | 'styled' | 'emotion' | 'callstack'

export type ThemeOptionsOverride = Omit<StorybookThemeOptions, 'base'>

export type ThemeOptions =
  | MuiThemeOptions
  | ThemeOptionsOverride
  | BadgerThemeOptions
  | { [key: string]: any }

export type ThemeInstanciated = StorybookTheme | MuiTheme | BadgerTheme<never>

export type ThemeVariants = { [key in ThemeVariantType]: ThemeOptions }

export type ThemeBackgroundsTypes =
  | 'normal'
  | 'reverse'
  | 'equal'
  | 'equal-reverse'
  | 'equal-app'
  | 'equal-content'

export type ThemeConverterFnProps = {
  background?: ThemeBackgroundsTypes
  override?: ThemeOptionsOverride
  responsiveFontSizes?: boolean
  theme: ThemeOptions
  variant: ThemeVariantType
}

export type ThemeConverterFnResult = {
  storybook: StorybookThemeOptions
  instanciated: ThemeInstanciated
  options: ThemeOptions
} | null

export type ThemeConverterFn = (props: ThemeConverterFnProps) => ThemeConverterFnResult
