import { ThemeOptions as MuiThemeOptions } from '@material-ui/core'
import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'
import { ThemeOptions as BadgerThemeConfig } from 'badger-ui'

import { Meta, Parameters } from '@storybook/react'
import { Args as DefaultArgs } from '@storybook/addons'
import type { ThemeInstanciatedType } from './config'

// Utility type for storybook theme overrides in various parameter types
export type ThemeOptionsOverride = Omit<StorybookThemeOptions, 'base'>
export type StorybookFaceliftThemeOptionsOverride = ThemeOptionsOverride

export type ThemeOptions =
  | MuiThemeOptions
  | StorybookFaceliftThemeOptionsOverride
  | BadgerThemeConfig
export type StorybookFaceliftThemeOptions = ThemeOptions

export type ThemeVariantType = 'light' | 'dark'
export type ThemeType = 'native' | 'mui' | 'badgerui'
export type ThemeProviderType = 'mui' | 'styled' | 'emotion'

export type ThemeVariants = { [key in ThemeVariantType]: ThemeOptions }
export type ThemeBackgroundsTypes =
  | 'normal'
  | 'reverse'
  | 'equal'
  | 'equal-reverse'
  | 'equal-app'
  | 'equal-content'

export type StorybookFaceliftTheme = ThemeInstanciatedType
export type { ThemeVars as StorybookThemeOptions } from '@storybook/theming'

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
  background?: ThemeBackgroundsTypes
  key: string
  override?: ThemeOptionsOverride
  provider?: ThemeProviderType
  providerTheme?: string
  providerOnly?: boolean
  resposiveFontSizes?: boolean
  title: string
  type: ThemeType
  variants: ThemeVariants
}

/**
 * Types used for parameter themeConverters
 *
 */

export type ThemeConverterFnProps = {
  background?: ThemeBackgroundsTypes
  override?: ThemeOptionsOverride
  responsiveFontSizes?: boolean
  theme: ThemeOptions
  variant: ThemeVariantType
}

export type ThemeConverterFnResult = {
  storybookThemeOptions: StorybookThemeOptions
  theme: ThemeInstanciatedType
  themeOptions: ThemeOptions
} | null

export type ThemeConverterFn = (props: ThemeConverterFnProps) => ThemeConverterFnResult
export type ParamThemeConverters = Record<string, ThemeConverterFn | undefined>

/**
 * Main & Exposed types
 *
 */

export type AddonParameters = {
  // @deprecated for addProvider
  autoThemeStory?: boolean
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

export type AddonStateParameters = {
  defaultTheme: string
  defaultVariant: ThemeVariantType
  docs: ParamDocs
  enhanceUi: boolean
  includeNative: boolean
  ui: ParamUi
  addProvider?: boolean
  native?: ParamNative
  override?: ThemeOptionsOverride
  provider?: ThemeProviderType
  providerTheme?: string
  themeConverters: ParamThemeConverters
  themes?: ParamTheme[]
  isStoryParam?: boolean
}

export type StoryParameters = Pick<
  AddonParameters,
  'addProvider' | 'provider' | 'providerTheme' | 'docs' | 'enhanceUi' | 'override' | 'ui'
> &
  Pick<AddonStateParameters, 'isStoryParam'>

export type DefaultParameters = {
  addProvider: boolean
  defaultTheme: string
  docs: ParamDocs
  enhanceUi: boolean
  includeNative: boolean
  themeConverters: ParamThemeConverters
  ui: ParamUi
}

export type StoryMeta<
  T extends Record<string, unknown> = Record<string, unknown>,
  ArgTypes = DefaultArgs
> = Meta<ArgTypes> & {
  parameters?: Parameters & {
    facelift: StoryParameters
  } & T
}

export type GlobalParameters<T extends Record<string, unknown> = Record<string, unknown>> = {
  facelift: AddonParameters
} & Parameters &
  T
