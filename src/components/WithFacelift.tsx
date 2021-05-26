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
} from '@material-ui/core/styles'
import { PreviewStyles } from '../styles/PreviewStyles'
import { useFaceliftSettings } from '../index'

import type { ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles'

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
  children?: React.ReactNode
}

export const WithFacelift = ({ children }: WithThemedPreviewProps) => {
  hideDocsRoot()

  const addonState = useFaceliftSettings()
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    if (addonState) {
      setShowChildren(true)
      setTimeout(showDocsRoot, 0)
    }
  }, [addonState])

  let Facelifted = (
    <>
      <PreviewStyles addonState={addonState} />
      {showChildren && children}
    </>
  )

  if (addonState) {
    const {
      themeKey,
      provider: stateProvider,
      providerTheme: stateProviderTheme,
      themeVariant = 'light',
      themes,
      parameters,
    } = addonState
    const {
      addProvider: _addProvider,
      autoThemeStory,
      provider: paramProvider,
      providerTheme: paramProviderTheme,
    } = parameters
    let addProvider = _addProvider

    if (!_addProvider && autoThemeStory) {
      addProvider = autoThemeStory
    }

    let providerKey = stateProvider || paramProvider
    let providerThemeKey = stateProviderTheme || paramProviderTheme

    if (!providerKey && themeKey) {
      const currentTheme = themes[themeKey]
      providerKey = currentTheme.provider
    }

    if (!providerThemeKey && themeKey) {
      const currentTheme = themes[themeKey]
      providerThemeKey = currentTheme.providerTheme
    }

    if (!providerKey || !providerThemeKey) {
      return Facelifted
    }

    const providerTheme = themes[providerThemeKey]
    const { instanciated, options } = providerTheme

    const providerThemeOptions = options[themeVariant]
    const providerThemeInstanciated = instanciated[themeVariant]

    switch (providerKey) {
      case 'mui':
        Facelifted = (
          <>
            <PreviewStyles addonState={addonState} />
            {showChildren && providerThemeOptions && addProvider ? (
              <MuiThemeProvider
                theme={createMuiTheme(providerThemeOptions as MuiThemeOptions)}
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
            <PreviewStyles addonState={addonState} />
            {showChildren && providerThemeInstanciated && addProvider ? (
              <StyledThemeProvider
                theme={providerThemeInstanciated}
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
            <PreviewStyles addonState={addonState} />
            {showChildren && providerThemeInstanciated && addProvider ? (
              <EmotionThemeProvider
                theme={providerThemeInstanciated}
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
        Facelifted = (
          <>
            <PreviewStyles addonState={addonState} />
            {showChildren && children}
          </>
        )
        break
    }
  }

  return Facelifted
}
