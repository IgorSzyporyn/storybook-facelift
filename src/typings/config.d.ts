import * as Parameters from './parameters'
import { Theme as MuiTheme } from '@material-ui/core'
import { ThemeVars as StorybookThemeOptions, Theme as StorybookTheme } from '@storybook/theming'

declare type ThemeInstanciatedType = StorybookTheme | MuiTheme

declare type ThemeOriginal = {
  light?: Parameters.ThemeOriginal
  dark?: Parameters.ThemeOriginal
}

declare type ThemeInstanciated = {
  light?: ThemeInstanciatedType
  dark?: ThemeInstanciatedType
}

declare type Theme = {
  key: string
  type: Parameters.ThemeTypes
  light?: StorybookThemeOptions
  dark?: StorybookThemeOptions
  original: ThemeOriginal
  instanciated: ThemeInstanciated
}

declare type Themes = {
  [key: string]: Theme | undefined
}

declare type Titles = {
  [key: string]: string
}

declare type AddonConfig = {
  themes: Themes
  titles: Titles
}
