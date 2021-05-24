// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react'
import { create } from 'jss'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import { CssBaseline } from '@material-ui/core'
import {
  createMuiTheme,
  jssPreset,
  MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
  Theme,
} from '@material-ui/core/styles'
import { useFaceliftSettings } from '../index'
import { PreviewStyles } from '../styles/PreviewStyles'

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
  children: React.ReactNode
}

export const WithFacelift = ({ children }: WithThemedPreviewProps) => {
  hideDocsRoot()

  const settings = useFaceliftSettings()
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    setShowChildren(true)
    setTimeout(showDocsRoot, 0)
  }, [settings])

  let Facelifted = (
    <>
      <PreviewStyles />
      {showChildren && children}
    </>
  )

  if (settings) {
    const {
      state: { themeOriginal, themeProvider, themeInstanciated },
      parameters: { autoThemeStory, defaultProvider },
    } = settings

    const provider = themeProvider || defaultProvider

    switch (provider) {
      case 'mui':
        Facelifted = (
          <>
            <PreviewStyles />
            {showChildren && themeOriginal && autoThemeStory ? (
              <MuiThemeProvider
                theme={createMuiTheme(themeOriginal as Theme)}
                key="storybook-facelift-mui-theme-provider"
              >
                <CssBaseline />
                <MuiStylesProvider
                  jss={create({
                    plugins: [...jssPreset().plugins],
                  })}
                >
                  {children}
                </MuiStylesProvider>
              </MuiThemeProvider>
            ) : (
              showChildren && children
            )}
          </>
        )
        break
      case 'styled':
        Facelifted = (
          <>
            <PreviewStyles />
            {showChildren && themeInstanciated && autoThemeStory ? (
              <StyledThemeProvider
                theme={themeInstanciated}
                key="storybook-facelift-styled-theme-provider"
              >
                {children}
              </StyledThemeProvider>
            ) : (
              showChildren && children
            )}
          </>
        )
        break
      case 'emotion':
        Facelifted = (
          <>
            <PreviewStyles />
            {showChildren && themeInstanciated && autoThemeStory ? (
              <EmotionThemeProvider
                theme={themeInstanciated}
                key="storybook-facelift-emotion-theme-provider"
              >
                {children}
              </EmotionThemeProvider>
            ) : (
              showChildren && children
            )}
          </>
        )
        break
      default:
        break
    }
  }

  return Facelifted
}
