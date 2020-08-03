import { create } from 'jss'
import React, { ReactNode, StrictMode } from 'react'
import { CssBaseline, NoSsr } from '@material-ui/core'
import { MuiThemeProvider, StylesProvider, jssPreset, Theme } from '@material-ui/core/styles'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'
import { Parameters } from '../typings'

const jss = create({
  plugins: [...jssPreset().plugins],
})

type WithMuiThemeProps = {
  children: ReactNode
}

export const WithMuiTheme = ({ children }: WithMuiThemeProps) => {
  const settings = useFaceliftSettings()
  let theme: Theme | false = false
  let themeOriginal: false | Parameters.ThemeOriginal = false
  let isMuiTheme = false

  if (settings) {
    const { state } = settings
    themeOriginal = state.themeOriginal ? state.themeOriginal : false
    isMuiTheme = state.themeType === 'mui' && themeOriginal !== undefined
  }

  if (themeOriginal && isMuiTheme) {
    theme = themeOriginal as Theme
  }

  return theme && isMuiTheme ? (
    <StrictMode>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider jss={jss}>
          <NoSsr defer>{children}</NoSsr>
        </StylesProvider>
      </MuiThemeProvider>
    </StrictMode>
  ) : (
    children
  )
}
