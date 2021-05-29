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
import { useFaceliftState } from '../index'

import type { ThemeOptions as MuiThemeOptions } from '@material-ui/core/styles'

/** @TODO
  api.addNotification({
    id: 'update',
    link: '/settings/about',
    content: {
      headline: `Storybook Y is available!`,
      subHeadline: `Your current version is: X`,
    },
    icon: { name: 'book' },
    onClear() {
      store.setState({ dismissedVersionNotification: latestVersion }, { persistence: 'permanent' });
    },
  });
 */

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

  const [showChildren, setShowChildren] = useState(false)
  const addonState = useFaceliftState()

  useEffect(() => {
    if (addonState.initialized) {
      setShowChildren(true)
      setTimeout(showDocsRoot, 0)
    }
  }, [addonState])

  let Facelifted = <>{showChildren && children}</>

  if (addonState) {
    const {
      themeKey,
      providerKey: stateProvider,
      providerThemeKey: stateProviderTheme,
      themeVariant = 'light',
      themes,
      parameters,
    } = addonState
    const {
      addProvider: _addProvider,
      autoThemeStory,
      enhanceUi,
      provider: paramProvider,
      providerTheme: paramProviderTheme,
    } = parameters
    Facelifted = (
      <>
        {enhanceUi && <PreviewStyles addonState={addonState} />}
        {showChildren && children}
      </>
    )

    let addProvider = _addProvider

    // Fallback for deprecated autoThemeStory
    if (!_addProvider && autoThemeStory) {
      addProvider = autoThemeStory
    }

    if (!addProvider) {
      return Facelifted
    }

    // Prepare provider values
    let providerKey = stateProvider || paramProvider
    let providerThemeKey = stateProviderTheme || paramProviderTheme

    // If no provider is available - try the current themes provider if any
    if (!providerKey && themeKey) {
      const currentTheme = themes[themeKey]
      providerKey = currentTheme.provider
    }

    // If no provider theme is available - try current themes provider theme if any
    if (!providerThemeKey && themeKey) {
      const currentTheme = themes[themeKey]
      providerThemeKey = currentTheme.providerTheme
    }

    // If no providerTheme or providerThemeKey - no reason to continue
    if (!providerKey || !providerThemeKey) {
      return Facelifted
    }

    // Now check if provider theme is available
    const providerTheme = themes[providerThemeKey] || {}
    const { instanciated, options } = providerTheme

    // If no providerThemes intanciated or options are found - then no reason to continue
    if (!instanciated || !options) {
      return Facelifted
    }

    const providerThemeOptions = options[themeVariant]
    const providerThemeInstanciated = instanciated[themeVariant]

    // If no instanciated and options found of the variants - then no reason to continue
    if (!providerThemeOptions || !providerThemeInstanciated) {
      return Facelifted
    }

    switch (providerKey) {
      case 'mui':
        Facelifted = (
          <>
            {enhanceUi && <PreviewStyles addonState={addonState} />}
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
            {enhanceUi && <PreviewStyles addonState={addonState} />}
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
            {enhanceUi && <PreviewStyles addonState={addonState} />}
            {showChildren && children}
          </>
        )
        break
    }
  }

  return Facelifted
}
