import { API, useAddonState } from '@storybook/api'
import { DOCS_RENDERED, SET_STORIES, STORY_CHANGED } from '@storybook/core-events'
import React, { useCallback, useEffect } from 'react'
import { ThemeSelector } from './components/ThemeSelector'
import { VariantSelector } from './components/VariantSelector'
import { ADDON_EVENT_THEME_CHANGE, ADDON_PARAM_KEY, ADDON_ID } from './constants'
import { createConfigDefaults, verifyConfig } from './managers/config'
import { updateAddonParameters, verifyParameters } from './managers/parameters'
import { createDefaultSettings } from './managers/settings'
import { createAddonState } from './managers/state'
import { ManagerStyles } from './styles/ManagerStyles'
import { Parameters, Settings } from './typings'

type SetThemeProps = {
  themeName?: string
  themeVariant?: Parameters.ThemeVariantTypes
  settings: Settings.AddonSettings
}

type FaceliftProps = {
  api: API
}

export function Facelift({ api }: FaceliftProps) {
  const apiParameters = api.getCurrentParameter<Parameters.ApiParameters | undefined>(
    ADDON_PARAM_KEY
  )

  const [settings, setSettings] = useAddonState<Settings.AddonSettings | undefined>(ADDON_ID)

  const setTheme = useCallback(
    ({ themeName, themeVariant, settings }: SetThemeProps) => {
      const addonState = createAddonState({
        parameters: settings.parameters,
        config: settings.config,
        options: {
          themeName: themeName || settings.state.themeName,
          themeVariant: themeVariant || settings.state.themeVariant,
        },
      })

      if (addonState.theme) {
        const { theme } = addonState

        api.setOptions({ theme })

        api.getChannel().emit(ADDON_EVENT_THEME_CHANGE, {
          ...settings,
          state: addonState,
        })

        setSettings({
          ...settings,
          state: addonState,
        })
      }
    },
    [api]
  )

  const toggleVariant = () => {
    if (settings) {
      setTheme({
        themeVariant: settings.state.themeVariant === 'dark' ? 'light' : 'dark',
        settings,
      })
    }
  }

  const toggleTheme = (themeName: string) => {
    if (settings) {
      setTheme({ themeName, settings })
    }
  }

  const renderTheme = () => {
    if (settings) {
      setTheme({ settings })
    }
  }

  useEffect(() => {
    const defaultSettings = createDefaultSettings(apiParameters)
    setSettings(defaultSettings)
  }, [])

  useEffect(() => {
    const channel = api.getChannel()

    channel.on(STORY_CHANGED, renderTheme)
    channel.on(SET_STORIES, renderTheme)
    channel.on(DOCS_RENDERED, renderTheme)

    return () => {
      channel.removeListener(STORY_CHANGED, renderTheme)
      channel.removeListener(SET_STORIES, renderTheme)
      channel.removeListener(DOCS_RENDERED, renderTheme)
    }
  })

  useEffect(() => {
    if (apiParameters && settings) {
      let parameters = updateAddonParameters({ apiParameters, settings })
      let config = createConfigDefaults(parameters)

      parameters = verifyParameters(parameters, config)
      config = verifyConfig(config, parameters)

      const isEqualParameters = JSON.stringify(settings.parameters) === JSON.stringify(parameters)
      const isEqualConfig = JSON.stringify(settings.config) === JSON.stringify(config)

      if (!isEqualParameters || !isEqualConfig) {
        setTheme({
          settings: {
            ...settings,
            parameters,
            config,
          },
        })
      }
    } else {
      renderTheme()
    }
  }, [apiParameters, setTheme, renderTheme])

  return (
    <>
      <ManagerStyles />
      <ThemeSelector onChange={toggleTheme} />
      <VariantSelector onClick={toggleVariant} />
    </>
  )
}
