import type { Theme as MuiTheme } from '@material-ui/core'
import type {
  ThemeVars as StorybookThemeOptions,
  Theme as StorybookTheme,
} from '@storybook/theming'
import { Theme as BadgerTheme } from 'badger-ui'
import type { ThemeOptions, ThemeType } from './parameters'

export type ThemeInstanciatedType = StorybookTheme | MuiTheme | BadgerTheme<never>

export type ConfigThemeOriginal = {
  light?: ThemeOptions
  dark?: ThemeOptions
}

export type ConfigThemeInstanciated = {
  light?: ThemeInstanciatedType
  dark?: ThemeInstanciatedType
}

export type ConfigTheme = {
  key: string
  type: ThemeType
  light?: StorybookThemeOptions
  dark?: StorybookThemeOptions
  original: {
    light?: ThemeOptions
    dark?: ThemeOptions
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
