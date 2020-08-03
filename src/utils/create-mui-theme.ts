import {
  createMuiTheme as _createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from '@material-ui/core'

export function createMuiTheme(themeOptions: ThemeOptions) {
  let theme = _createMuiTheme(themeOptions)

  theme = responsiveFontSizes(theme)

  return theme
}
