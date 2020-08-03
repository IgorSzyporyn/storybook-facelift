import * as Parameters from './state-parameters'
import { ThemeVars } from '@storybook/theming'

declare type ThemeOriginal = {
  light?: Parameters.ThemeOriginal
  dark?: Parameters.ThemeOriginal
}

declare type Theme = {
  key: string
  type: Parameters.ThemeTypes
  light?: ThemeVars
  dark?: ThemeVars
  original: ThemeOriginal
}

declare type Themes = {
  [key: string]: Theme
}

declare type Titles = {
  [key: string]: string
}

declare type Config = {
  themes: Themes
  titles: Titles
}
