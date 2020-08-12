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
import { useFaceliftSettings } from '../index'
import { PreviewStyles } from '../styles/PreviewStyles'
import { Parameters } from '../typings'

function showDocsRoot() {
  const docsRoot = document.getElementById('docs-root')
  
  if (docsRoot) {
    docsRoot.style.opacity = '1'
    docsRoot.style.visibility = 'visible'
  }
}

function hideDocsRoot() {
  const docsRoot = document.getElementById('docs-root')

  if (docsRoot) {
    docsRoot.style.opacity = '0'
    docsRoot.style.visibility = 'hidden'
  }
}

type WithThemedPreviewProps = {
  children: ReactNode
}

export const WithFacelift = ({ children }: WithThemedPreviewProps) => {
  const settings = useFaceliftSettings()
  const [showChildren, setShowChildren] = useState(false)

  hideDocsRoot()

  useEffect(() => {
    setShowChildren(true)
    setTimeout(showDocsRoot, 0)
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
