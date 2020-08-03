import * as Parameters from './state-parameters'
import { ThemeVars } from '@storybook/theming'

declare type ConfigThemeOriginal = {
  light?: Parameters.ParameterThemeOriginal
  dark?: Parameters.ParameterThemeOriginal
}

declare type ConfigTheme = {
  key: string
  type: Parameters.ParameterThemeTypes
  light?: ThemeVars
  dark?: ThemeVars
  original: ConfigThemeOriginal
}

declare type ConfigThemes = {
  [key: string]: ConfigTheme
}

declare type ConfigTitles = {
  [key: string]: string
}

declare type Config = {
  themes: ConfigThemes
  titles: ConfigTitles
}
