import {
  createMuiTheme,
  responsiveFontSizes,
  PaletteType,
  Theme as MuiTheme,
} from '@material-ui/core'
import { orange, blue, green, deepPurple, red, deepOrange } from '@material-ui/core/colors'

const createTheme = (paletteType: PaletteType = 'light') => {
  const isDark = paletteType === 'dark'

  let theme = createMuiTheme({
    palette: {
      type: paletteType,
      primary: {
        main: isDark ? orange['A200'] : orange[500],
      },
      secondary: {
        main: isDark ? deepPurple['A200'] : deepPurple[500],
      },
      error: {
        main: isDark ? red['A200'] : red[500],
      },
      info: {
        main: isDark ? blue['A200'] : blue[500],
      },
      success: {
        main: isDark ? green['A200'] : green[500],
      },
      warning: {
        main: isDark ? deepOrange['A200'] : deepOrange[500],
      },
    },
  })

  theme = responsiveFontSizes(theme)

  return theme
}

export type Theme = {
  light: MuiTheme
  dark: MuiTheme
}

export const theme: Theme = {
  light: createTheme('light'),
  dark: createTheme('dark'),
}
