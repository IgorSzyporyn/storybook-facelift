// eslint-disable-next-line no-use-before-define
import React, { memo, useEffect } from 'react'
import deepmerge from 'ts-deepmerge'
import { useAddonState, useStorybookApi } from '@storybook/api'
import { defaultAddonState, defaultParameters } from './defaults'
import { ADDON_EVENT_STATE_CHANGE, ADDON_ID, ADDON_PARAM_KEY } from './constants'
import { DOCS_RENDERED, STORY_CHANGED } from '@storybook/core-events'
import { createStateFromParameters } from './utils/create-state-from-parameters/create-state-from-parameters'
import { getDefaultActiveProviderValues } from './utils/get-default-active-provider-values'
import { getDefaultActiveThemeValues } from './utils/get-default-active-theme-values'
import { ManagerStyles } from './styles/ManagerStyles'
import { ThemeSelector } from './components/ThemeSelector'
import { VariantSelector } from './components/VariantSelector'

import type { AddonParameters } from './typings/internal/parameters'
import { AddonState } from './typings/internal/state'

export const Facelift = memo(() => {
  const api = useStorybookApi()
  const channel = api.getChannel()
  const parameters = api.getCurrentParameter<AddonParameters>(ADDON_PARAM_KEY)
  const [state, setState] = useAddonState(ADDON_ID, defaultAddonState)

  const setTheme = ({ themes, themeKey, themeVariant, parameters: _parameters }: AddonState) => {
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
      if (_parameters.override) {
        theme = {
          base: themeVariant || 'light',
          ...theme,
          ..._parameters.override,
        }
      }

      api.setOptions({ theme })
    }
  }

  /**
   * HANDLE INITIAL RUN WITH NO PARAMETERS OR ANYTHING - SET DEFAULT SECURE FALLBACK VALUES
   */
  useEffect(() => {
    const initialParameters = deepmerge({}, defaultParameters, parameters || {})
    const createdState = createStateFromParameters(initialParameters)

    const defaultThemeValues = getDefaultActiveThemeValues({
      parameters: initialParameters,
      themes: createdState.themes,
    })

    const newState = {
      ...state,
      parameters: initialParameters,
      themeKey: defaultThemeValues.themeKey,
      themeVariant: defaultThemeValues.themeVariant,
      converters: createdState.converters,
      themes: createdState.themes,
      themeTitles: createdState.themeTitles,
    }

    setState(newState)
    setTheme(newState)
    channel.emit(ADDON_EVENT_STATE_CHANGE, newState)
  }, [])

  /**
   * HANDLE STATE INITIALIZATION WITH PARAMETERS AND ALL SUBSEQUENT PARAMETER CHANGES
   */
  useEffect(() => {
    if (!state.initialized && parameters) {
      const initialParameters = deepmerge({}, state.parameters, parameters)
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

      const newState = {
        ...state,
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
      }

      setState(newState)
      setTheme(newState)
      channel.emit(ADDON_EVENT_STATE_CHANGE, newState)
    } else if (parameters && JSON.stringify(parameters) !== JSON.stringify(state.parameters)) {
      const newState = { ...state, parameters }
      setState(newState)
      setTheme(newState)
      channel.emit(ADDON_EVENT_STATE_CHANGE, newState)
    }
  }, [parameters, state, setState, setTheme])

  const handleStoryChanged = () => {
    // setState({ ...state, trigger: state.trigger + 1 })
    channel.emit(ADDON_EVENT_STATE_CHANGE, state)
  }

  const handleDocsChanged = () => {
    channel.emit(ADDON_EVENT_STATE_CHANGE, state)
  }

  useEffect(() => {
    channel.on(STORY_CHANGED, handleStoryChanged)
    channel.on(DOCS_RENDERED, handleDocsChanged)

    return () => {
      channel.removeListener(STORY_CHANGED, handleStoryChanged)
      channel.removeListener(DOCS_RENDERED, handleDocsChanged)
    }
  }, [api, state])

  const toggleVariant = () => {
    const newState: AddonState = {
      ...state,
      themeVariant: state?.themeVariant === 'dark' ? 'light' : 'dark',
    }

    setState(newState)
    setTheme(newState)
    channel.emit(ADDON_EVENT_STATE_CHANGE, newState)
  }

  const toggleTheme = (themeKey: string) => {
    const newState = { ...state, themeKey }

    setState(newState)
    setTheme(newState)
    channel.emit(ADDON_EVENT_STATE_CHANGE, newState)
  }

  return (
    <>
      {state?.parameters.enhanceUi && <ManagerStyles addonState={state} />}
      {state.initialized && (
        <>
          <ThemeSelector addonState={state} onChange={toggleTheme} />
          <VariantSelector addonState={state} onClick={toggleVariant} />
        </>
      )}
    </>
  )
})
