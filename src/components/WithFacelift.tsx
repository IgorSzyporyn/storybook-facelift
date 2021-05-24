// eslint-disable-next-line no-use-before-define
import React, { ReactNode, useEffect, useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import {
  createMuiTheme,
  jssPreset,
  MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
  Theme,
} from '@material-ui/core/styles'
import { create, Jss } from 'jss'
import { useFaceliftSettings } from '../index'
import { PreviewStyles } from '../styles/PreviewStyles'

import type { ThemeOptions } from '../typings/internal/parameters'

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
  let themeOriginal: false | ThemeOptions = false
  let themeInstanciated: false | Record<string, any> = false
  let autoThemeStory = false

  let isStyledTheme = false

  let isMuiTheme = false
  let isMuiValid = false
  let muiJSS: Jss | null = null

  if (settings) {
    const { state, parameters } = settings
    themeOriginal = state.themeOriginal ? state.themeOriginal : false
    themeInstanciated = state.themeInstanciated ? state.themeInstanciated : false
    isMuiTheme = state.themeType === 'mui'
    isMuiValid = themeOriginal && isMuiTheme
    autoThemeStory = parameters.autoThemeStory === true

    isStyledTheme = state.themeType === 'badgerui'

    // @TODO - Let user add jssPresets through parameters
    muiJSS = create({
      plugins: [...jssPreset().plugins],
    })
  }

  if (isMuiTheme) {
    if (isMuiValid) {
      theme = themeOriginal as Theme
    }

    return (
      <>
        <PreviewStyles />
        {showChildren && (
          <>
            {theme && autoThemeStory && muiJSS !== null ? (
              <MuiThemeProvider
                theme={createMuiTheme(theme)}
                key="storybook-facelift-mui-theme-provider"
              >
                <CssBaseline />
                <MuiStylesProvider jss={muiJSS}>{children}</MuiStylesProvider>
              </MuiThemeProvider>
            ) : (
              children
            )}
          </>
        )}
      </>
    )
  }

  if (isStyledTheme) {
    return (
      <>
        <PreviewStyles />
        {themeInstanciated && autoThemeStory ? (
          <StyledComponentsThemeProvider
            theme={themeInstanciated}
            key="storybook-facelift-styled-theme-provider"
          >
            {children}
          </StyledComponentsThemeProvider>
        ) : (
          children
        )}
      </>
    )
  }

  return (
    <>
      <PreviewStyles />
      {children}
    </>
  )
}
