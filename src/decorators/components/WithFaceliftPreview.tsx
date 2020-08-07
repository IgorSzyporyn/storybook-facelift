import { CssBaseline } from '@material-ui/core'
import {
  createMuiTheme,
  jssPreset,
  MuiThemeProvider,
  StylesProvider,
  Theme,
} from '@material-ui/core/styles'
import { create, Jss } from 'jss'
import React, { ReactNode, useEffect, useState } from 'react'
import { useFaceliftSettings } from '../../hooks/UseFaceliftSettings'
import { PreviewStyles } from '../../styles/PreviewStyles'
import { Parameters } from '../../typings'

type WithThemedPreviewProps = {
  children: ReactNode
}

export const WithFaceliftPreview = ({ children }: WithThemedPreviewProps) => {
  const settings = useFaceliftSettings()
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    if (settings) {
      setShowChildren(true)
    }
  }, [settings])

  let theme: Theme | false = false
  let themeOriginal: false | Parameters.ThemeOriginal = false
  let isMuiTheme = false
  let autoThemeStory = false
  let valid = false
  let jss: Jss | null = null

  if (settings) {
    const { state, parameters } = settings
    themeOriginal = state.themeOriginal ? state.themeOriginal : false
    isMuiTheme = state.themeType === 'mui'
    valid = themeOriginal && isMuiTheme
    autoThemeStory = parameters.autoThemeStory === true

    // @TODO - Let user add jssPresets through parameters
    jss = create({
      plugins: [...jssPreset().plugins],
    })
  }

  if (valid) {
    theme = themeOriginal as Theme
  }

  return (
    <>
      <PreviewStyles />
      {showChildren && (
        <>
          {theme && isMuiTheme && autoThemeStory && jss !== null ? (
            <MuiThemeProvider theme={createMuiTheme(theme)}>
              <CssBaseline />
              <StylesProvider jss={jss}>{children}</StylesProvider>
            </MuiThemeProvider>
          ) : (
            <>{children}</>
          )}
        </>
      )}
    </>
  )
}
