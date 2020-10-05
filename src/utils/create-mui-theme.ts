import {
  createMuiTheme as _createMuiTheme,
  responsiveFontSizes as _responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core'
import { Parameters } from '../typings'

export function createMuiTheme(
  themeOptions: ThemeOptions,
  { responsiveFontSizes }: Parameters.ThemeConverterProps
) {
  let theme = _createMuiTheme(themeOptions)

  if (responsiveFontSizes) {
    theme = _responsiveFontSizes(theme)
  }

  return theme
}
