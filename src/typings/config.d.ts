import * as Parameters from './parameters'
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
  [key: string]: Theme | undefined
}

declare type Titles = {
  [key: string]: string
}

declare type AddonConfig = {
  themes: Themes
  titles: Titles
}
