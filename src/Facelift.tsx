// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect, useState } from 'react'
/* eslint-disable no-underscore-dangle */
import { API } from '@storybook/api'
import { DOCS_RENDERED, STORY_CHANGED } from '@storybook/core-events'
import { ThemeSelector } from './components/ThemeSelector'
import { VariantSelector } from './components/VariantSelector'
import { ADDON_EVENT_THEME_CHANGE, ADDON_PARAM_KEY } from './constants'
import { createConfigDefaults, verifyConfig } from './managers/config'
import { updateAddonParameters, verifyParameters } from './managers/parameters'
import { createDefaultSettings } from './managers/settings'
import { createAddonState } from './managers/state'
import { ManagerStyles } from './styles/ManagerStyles'
import { Parameters, Settings } from './typings'
// import { addStories } from './managers/stories'

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

  const [settings, setSettings] = useState<Settings.AddonSettings | null>(null)

  const setTheme = useCallback(
    ({ themeName, themeVariant, settings: __settings }: SetThemeProps) => {
      const addonState = createAddonState({
        parameters: __settings.parameters,
        config: __settings.config,
        options: {
          themeName: themeName || __settings.state.themeName,
          themeVariant: themeVariant || __settings.state.themeVariant,
        },
      })

      if (addonState.theme) {
        const _addonStateClone = { ...addonState }
        const _settingsClone = { ...__settings }
        const { theme } = _addonStateClone

        const _settings = {
          ..._settingsClone,
          state: _addonStateClone,
        }

        api.setOptions({ theme })
        api.getChannel().emit(ADDON_EVENT_THEME_CHANGE, _settings)

        setSettings(_settings)
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
    const addonsSettings = createDefaultSettings(apiParameters)
    setSettings(addonsSettings)
  }, [])

  useEffect(() => {
    const channel = api.getChannel()

    channel.on(STORY_CHANGED, renderTheme)
    // channel.on(SET_STORIES, renderTheme)
    channel.on(DOCS_RENDERED, renderTheme)

    return () => {
      channel.removeListener(STORY_CHANGED, renderTheme)
      // channel.removeListener(SET_STORIES, renderTheme)
      channel.removeListener(DOCS_RENDERED, renderTheme)
    }
  }, [api, renderTheme])

  useEffect(() => {
    if (apiParameters && settings) {
      let parameters = updateAddonParameters({ apiParameters, settings })
      let config = createConfigDefaults(parameters)

      parameters = verifyParameters(parameters, config)
      config = verifyConfig(config, parameters)

      const isEqualParameters = JSON.stringify(settings.parameters) === JSON.stringify(parameters)
      const isEqualConfig = JSON.stringify(settings.config) === JSON.stringify(config)

      if (!isEqualParameters || !isEqualConfig) {
        const initializing = isEqualParameters === false && isEqualConfig === false

        const newSettings: Settings.AddonSettings = {
          ...settings,
          parameters,
          config,
        }

        if (initializing) {
          /* @TODO - Add stores dynamically with color palette shown etc.. if theme is supported
            if (newSettings.parameters.stories) {
              addStories(newSettings.parameters.stories)
            }
          */

          const state = createAddonState({
            parameters: newSettings.parameters,
            config: newSettings.config,
            options: {
              themeName: newSettings.parameters.defaultTheme,
              themeVariant: newSettings.parameters.defaultVariant,
            },
          })

          newSettings.initialAddonParameters = parameters
          newSettings.state = state
          newSettings.initialized = initializing
        }

        setTheme({ settings: newSettings })
      }
    } else {
      renderTheme()
    }
  }, [apiParameters, setTheme])

  return (
    <>
      <ManagerStyles />
      <ThemeSelector onChange={toggleTheme} />
      <VariantSelector onClick={toggleVariant} />
    </>
  )
}
