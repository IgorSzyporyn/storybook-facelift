import {
  createMuiTheme as _createMuiTheme,
  responsiveFontSizes as _responsiveFontSizes,
} from '@material-ui/core'

import type { ThemeOptions } from '@material-ui/core'
import type { ThemeConverterFnProps } from '../types/parameters'

export function createMuiTheme(
  themeOptions: ThemeOptions,
  { responsiveFontSizes }: ThemeConverterFnProps
) {
  let theme = _createMuiTheme(themeOptions)

  if (responsiveFontSizes) {
    theme = _responsiveFontSizes(theme)
  }

  return theme
}
