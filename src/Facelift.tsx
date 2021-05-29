// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect } from 'react'
import { API, useAddonState, useParameter } from '@storybook/api'
import { DOCS_RENDERED, STORY_CHANGED } from '@storybook/core-events'
import deepmerge from 'ts-deepmerge'
import { isEmpty } from 'lodash'
import { ThemeSelector } from './components/ThemeSelector'
import { VariantSelector } from './components/VariantSelector'
import { ADDON_EVENT_THEME_CHANGE, ADDON_ID, ADDON_PARAM_KEY } from './constants'
import { ManagerStyles } from './styles/ManagerStyles'
import { createStateFromParameters } from './utils/create-state-from-parameters/create-state-from-parameters'
import { getDefaultActiveThemeValues } from './utils/get-default-active-theme-values'
import { getDefaultActiveProviderValues } from './utils/get-default-active-provider-values'
import { defaultParameters, defaultAddonState } from './defaults'

import type { AddonState } from './typings/internal/state'
import type { AddonParameters } from './typings/internal/parameters'

type FaceliftProps = {
  api: API
}

export const Facelift = ({ api }: FaceliftProps) => {
  // const addonParameters = api.getCurrentParameter<AddonParameters>(ADDON_PARAM_KEY) || {}
  const addonParameters = useParameter<AddonParameters>(ADDON_PARAM_KEY, {})
  const [addonState, setAddonState] = useAddonState<AddonState | undefined>(ADDON_ID)

  const setTheme = (state: AddonState) => {
    const { themes, themeKey, themeVariant } = state

    if (
      themes &&
      themeKey &&
      themeVariant &&
      themes[themeKey] &&
      themes[themeKey].storybook &&
      themes[themeKey].storybook[themeVariant]
    ) {
      let theme = themes[themeKey].storybook[themeVariant]

      // Handle overrides on run time
      if (state.parameters.override) {
        theme = {
          base: state.themeVariant || 'light',
          ...theme,
          ...state.parameters.override,
        }
      }

      api.setOptions({ theme })
    }
  }

  const updateAddonState = useCallback(
    (state: AddonState, force?: boolean) => {
      const apiChannel = api.getChannel()
      if (JSON.stringify(addonState) !== JSON.stringify(state)) {
        const newState = deepmerge({}, addonState || {}, state)

        setAddonState(newState)
        setTheme(newState)
        apiChannel.emit(ADDON_EVENT_THEME_CHANGE, newState)
      } else if (force) {
        apiChannel.emit(ADDON_EVENT_THEME_CHANGE, state)
      }
    },
    [api, setAddonState]
  )

  const toggleVariant = () => {
    if (addonState?.initialized) {
      const newState: AddonState = {
        ...addonState,
        themeVariant: addonState?.themeVariant === 'dark' ? 'light' : 'dark',
      }

      updateAddonState(newState)
    }
  }

  const toggleTheme = (themeKey: string) => {
    if (addonState?.initialized) {
      const newState = { ...addonState, themeKey }
      updateAddonState(newState)
    }
  }

  const renderTheme = () => {
    if (addonState?.initialized) {
      updateAddonState(addonState, true)
    }
  }

  useEffect(() => {
    // First run only we setup the minimum default values for state
    if (!addonState) {
      const initialParameters = deepmerge({}, defaultParameters, addonParameters)

      // Create the default "themes", "converters" & "themeTitles" for the addon state
      // which will just be native for fallbacks
      const createdState = createStateFromParameters(initialParameters)

      // Get the initial addonState values for chosen theme
      const defaultThemeValues = getDefaultActiveThemeValues({
        parameters: initialParameters,
        themes: createdState.themes,
      })

      setAddonState({
        ...defaultAddonState,
        parameters: initialParameters,
        themeKey: defaultThemeValues.themeKey,
        themeVariant: defaultThemeValues.themeVariant,
        converters: createdState.converters,
        themes: createdState.themes,
        themeTitles: createdState.themeTitles,
      })
    }

    // Not first run but - may be first run with use params to handle!
    if (addonState && !isEmpty(addonParameters) && !addonState.initialized) {
      const initialParameters = deepmerge({}, addonState.parameters, addonParameters)
      // Create the "themes", "converters" & "themeTitles" for the addon state
      const createdState = createStateFromParameters(initialParameters)

      // Get the initial addonState values for chosen theme
      const defaultThemeValues = getDefaultActiveThemeValues({
        parameters: initialParameters,
        themes: createdState.themes,
      })

      // Get the initial addonState values for chosen provider
      const defaultProviderValues = getDefaultActiveProviderValues({
        parameters: initialParameters,
        themes: createdState.themes,
      })

      updateAddonState({
        ...defaultAddonState,
        parameters: initialParameters,
        themeKey: defaultThemeValues.themeKey,
        themeVariant: defaultThemeValues.themeVariant,
        providerKey: defaultProviderValues.providerKey,
        providerThemeKey: defaultProviderValues.providerThemeKey,
        converters: createdState.converters,
        themes: createdState.themes,
        themeTitles: createdState.themeTitles,
        initialized: true,
      })
    }

    // Every time parameters changes we setup a new state object
    if (addonState && addonState.initialized) {
      const parameters = deepmerge({}, defaultParameters, addonParameters)
      const newState = { ...addonState, parameters }

      updateAddonState(newState)
    }
  }, [addonState, addonParameters, setAddonState, updateAddonState])

  useEffect(() => {
    const apiChannel = api.getChannel()

    apiChannel.on(STORY_CHANGED, renderTheme)
    apiChannel.on(DOCS_RENDERED, renderTheme)

    return () => {
      apiChannel.removeListener(STORY_CHANGED, renderTheme)
      apiChannel.removeListener(DOCS_RENDERED, renderTheme)
    }
  }, [api, renderTheme])

  return (
    <>
      {addonState?.parameters.enhanceUi && <ManagerStyles addonState={addonState} />}
      <ThemeSelector addonState={addonState} onChange={toggleTheme} />
      <VariantSelector addonState={addonState} onClick={toggleVariant} />
    </>
  )
}
