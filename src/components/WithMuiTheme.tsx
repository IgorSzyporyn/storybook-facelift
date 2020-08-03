import { create } from 'jss'
import React, { ReactNode, StrictMode } from 'react'
import { CssBaseline, NoSsr } from '@material-ui/core'
import { MuiThemeProvider, StylesProvider, jssPreset, Theme } from '@material-ui/core/styles'
import { useThemedState } from '../hooks/UseThemedState'

const jss = create({
  plugins: [...jssPreset().plugins],
})

type WithMuiThemeProps = {
  children: ReactNode
}

export const WithMuiTheme = ({ children }: WithMuiThemeProps) => {
  const { themeType, themeOriginal } = useThemedState()
  const isMuiTheme = themeType === 'mui' && themeOriginal !== undefined

  const theme = themeOriginal as Theme

  return isMuiTheme ? (
    <StrictMode>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <StylesProvider jss={jss}>
          <NoSsr defer>{children}</NoSsr>
        </StylesProvider>
      </MuiThemeProvider>
    </StrictMode>
  ) : (
    <>{children}</>
  )
}
