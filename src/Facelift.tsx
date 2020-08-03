import { API, useAddonState, useParameter } from '@storybook/api'
import { DOCS_RENDERED, SET_STORIES, STORY_CHANGED } from '@storybook/core-events'
import equal from 'fast-deep-equal'
import React, { useCallback, useEffect, useState } from 'react'
import { ThemeSelector } from './components/ThemeSelector'
import { VariantSelector } from './components/VariantSelector'
import { AddonEvents, ADDON_EVENT_THEME_CHANGE, ADDON_ID, ADDON_PARAM_KEY } from './constants'
import { createConfigDefaults, verifyConfig } from './state-config'
import { createParameterDefaults, updateParameters, verifyParameters } from './state-parameters'
import { ManagerStyles } from './styles/ManagerStyles'
import { EVENT_NAMES, Parameters } from './typings'
import { Settings } from './typings/state-settings'
import { createThemeState } from './utils/create-theme-state'

type ThemeState = {
  name: string
  variant: Parameters.ParameterThemeVariantTypes
}

type SetThemeProps = Partial<ThemeState> & {
  settings?: Settings
  themeState?: ThemeState
  eventName?: EVENT_NAMES
}

type FaceliftProps = {
  api: API
}

export function Facelift({ api }: FaceliftProps) {
  const apiParameters = useParameter<Partial<Parameters.Parameters>>(ADDON_PARAM_KEY)

  let defaultParameters = createParameterDefaults(apiParameters)
  let defaultConfig = createConfigDefaults(defaultParameters)

  defaultParameters = verifyParameters(defaultParameters, defaultConfig)
  defaultConfig = verifyConfig(defaultConfig, defaultParameters)

  const [settings, setSettings] = useAddonState<Settings>(ADDON_ID, {
    parameters: defaultParameters,
    config: defaultConfig,
  })

  const [themeState, setThemeState] = useState<ThemeState>({
    name: defaultParameters.defaultTheme,
    variant: defaultParameters.defaultVariant,
  })

  const setTheme = useCallback(
    ({
      settings: _settings = settings,
      themeState: _themeState = themeState,
      ...rest
    }: SetThemeProps) => {
      const _state = { ..._themeState, ...rest }
      const detailedThemeState = createThemeState(_settings, _state)

      if (detailedThemeState) {
        const { theme } = detailedThemeState
        api.setOptions({ theme })

        // Fire the combined event for any change
        api.getChannel().emit(ADDON_EVENT_THEME_CHANGE, detailedThemeState)

        setThemeState({
          name: detailedThemeState.themeName,
          variant: detailedThemeState.themeVariant,
        })
      }
    },
    [api]
  )

  const toggleVariant = () => {
    setTheme({
      name: themeState.name,
      variant: themeState.variant === 'dark' ? 'light' : 'dark',
      settings,
      eventName: AddonEvents.STATE_CHANGE_VARIANT,
    })
  }

  const toggleTheme = (name: string) => {
    setTheme({
      name,
      settings,
      themeState,
      eventName: AddonEvents.STATE_CHANGE_THEME,
    })
  }

  const renderTheme = (eventName: EVENT_NAMES) => {
    setTheme({ ...themeState, settings, eventName })
  }

  const renderer = {
    STORY_CHANGED: () => renderTheme(STORY_CHANGED),
    DOCS_RENDERED: () => renderTheme(DOCS_RENDERED),
    SET_STORIES: () => renderTheme(SET_STORIES),
  }

  useEffect(() => {
    const channel = api.getChannel()

    channel.on(STORY_CHANGED, renderer.STORY_CHANGED)
    channel.on(SET_STORIES, renderer.SET_STORIES)
    channel.on(DOCS_RENDERED, renderer.DOCS_RENDERED)

    return () => {
      channel.removeListener(STORY_CHANGED, renderer.STORY_CHANGED)
      channel.removeListener(SET_STORIES, renderer.SET_STORIES)
      channel.removeListener(DOCS_RENDERED, renderer.DOCS_RENDERED)
    }
  })

  useEffect(() => {
    let parameters = updateParameters(apiParameters, settings.parameters)
    let config = createConfigDefaults(parameters)

    parameters = verifyParameters(parameters, config)
    config = verifyConfig(config, parameters)

    const isEqualParameters = equal(settings.parameters, parameters)
    const isEqualConfig = equal(settings.config, config)

    if (!isEqualParameters || !isEqualConfig) {
      const { _initialized } = parameters

      setSettings({
        ...settings,
        parameters: {
          ...parameters,
          _initialized: true,
        },
        config,
      })

      setTheme({
        name: _initialized ? themeState.name : parameters.defaultTheme,
        variant: _initialized ? themeState.variant : parameters.defaultVariant,
        settings: { parameters, config },
        themeState,
        eventName:
          _initialized === true
            ? AddonEvents.PARAMETERS_UPDATED
            : AddonEvents.PARAMETERS_INITIALIZED,
      })
    }
  }, [apiParameters, setTheme])

  console.log(settings.config.themes)

  return (
    <>
      <ManagerStyles />
      <ThemeSelector onChange={toggleTheme} />
      <VariantSelector onClick={toggleVariant} />
    </>
  )
}
