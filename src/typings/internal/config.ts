import type { Theme as MuiTheme } from '@material-ui/core'
import type {
  ThemeVars as StorybookThemeOptions,
  Theme as StorybookTheme,
} from '@storybook/theming'
import { Theme as BadgerTheme } from 'badger-ui'
import type { ThemeVariant, ThemeTypes } from './parameters'

export type ThemeInstanciatedType = StorybookTheme | MuiTheme | BadgerTheme<never>

export type ConfigThemeOriginal = {
  light?: ThemeVariant
  dark?: ThemeVariant
}

export type ConfigThemeInstanciated = {
  light?: ThemeInstanciatedType
  dark?: ThemeInstanciatedType
}

export type ConfigTheme = {
  key: string
  type: ThemeTypes
  light?: StorybookThemeOptions
  dark?: StorybookThemeOptions
  original: {
    light?: ThemeVariant
    dark?: ThemeVariant
  }
  instanciated: ConfigThemeInstanciated
}

export type ConfigThemes = {
  [key: string]: ConfigTheme | undefined
}

export type ConfigTitles = {
  [key: string]: string
}

export type AddonConfig = {
  themes: ConfigThemes
  titles: ConfigTitles
}
