// eslint-disable-next-line no-use-before-define
import React, { useCallback, useEffect } from 'react'
import { API, useAddonState } from '@storybook/api'
import { DOCS_RENDERED, STORY_CHANGED } from '@storybook/core-events'
import deepmerge from 'ts-deepmerge'
import { ThemeSelector } from './components/ThemeSelector'
import { VariantSelector } from './components/VariantSelector'
import { ADDON_EVENT_THEME_CHANGE, ADDON_ID, ADDON_PARAM_KEY } from './constants'
import { ManagerStyles } from './styles/ManagerStyles'
import { createStorybookThemeOptionsFromMui } from './utils/create-storybook-theme-from-mui'
import { createStorybookThemeFromNative } from './utils/create-storybook-theme-from-native'
import { createStorybookThemeFromBadgerUi } from './utils/create-storybook-theme-from-badgerui'
import { createStateFromParameters } from './utils/create-state-from-parameters'
import { getDefaultActiveThemeValues } from './utils/get-default-active-theme-values'

import type { AddonState } from './typings/internal/state'
import type { AddonParameters } from './typings/internal/parameters'

const defaultParameters: AddonParameters = {
  defaultTheme: 'native',
  addProvider: false,
  includeNative: false,
  themeConverters: {
    mui: createStorybookThemeOptionsFromMui,
    native: createStorybookThemeFromNative,
    badgerui: createStorybookThemeFromBadgerUi,
    styled: createStorybookThemeFromBadgerUi,
  },
  docs: {
    type: 'full',
  },
  enhanceUi: false,
  ui: {
    elevation: 2,
  },
}

const defaultAddonState: AddonState = {
  initialized: false,
  converters: {},
  themes: {},
  themeTitles: {},
  parameters: { ...defaultParameters },
}

type FaceliftProps = {
  api: API
}

export const Facelift = ({ api }: FaceliftProps) => {
  const _parameters = api.getCurrentParameter<AddonParameters | undefined>(ADDON_PARAM_KEY)
  const [addonState, setAddonState] = useAddonState<AddonState | undefined>(ADDON_ID)
  const parameters = deepmerge({}, defaultParameters, _parameters || {}, {
    themeConverters: defaultParameters.themeConverters,
  })

  const updateAddonState = useCallback(
    (state: AddonState) => {
      setAddonState(state)
      api.getChannel().emit(ADDON_EVENT_THEME_CHANGE, state)

      if (state.themeKey) {
        const theme = state.themes[state.themeKey].storybook[state.themeVariant || 'light']
        api.setOptions({ theme })
      }
    },
    [api, setAddonState, addonState]
  )

  const toggleVariant = () => {
    if (addonState?.initialized) {
      updateAddonState({
        ...addonState,
        themeVariant: addonState?.themeVariant === 'dark' ? 'light' : 'dark',
      })
    }
  }

  const toggleTheme = (themeKey: string) => {
    if (addonState?.initialized) {
      updateAddonState({ ...addonState, themeKey })
    }
  }

  const renderTheme = () => {
    if (addonState?.initialized) {
      updateAddonState(addonState)
    }
  }

  useEffect(() => {
    if (_parameters) {
      if (addonState?.initialized) {
        updateAddonState({ ...addonState, parameters: _parameters })
      } else {
        // Create the "themes", "converters" & "themeTitles" for the addon state
        const configuredAddonState = createStateFromParameters(parameters)

        // Get the initial addonState values for chosen theme
        const { themeKey, themeVariant } = getDefaultActiveThemeValues({
          parameters,
          themes: configuredAddonState.themes,
        })

        updateAddonState({
          ...defaultAddonState,
          ...configuredAddonState,
          parameters: _parameters,
          initialized: true,
          themeKey,
          themeVariant,
        })
      }
    }
  }, [_parameters])

  useEffect(() => {
    const channel = api.getChannel()

    channel.on(STORY_CHANGED, renderTheme)
    channel.on(DOCS_RENDERED, renderTheme)

    return () => {
      channel.removeListener(STORY_CHANGED, renderTheme)
      channel.removeListener(DOCS_RENDERED, renderTheme)
    }
  }, [api, renderTheme])

  return (
    <>
      <ManagerStyles addonState={addonState} />
      <ThemeSelector addonState={addonState} onChange={toggleTheme} />
      <VariantSelector addonState={addonState} onClick={toggleVariant} />
    </>
  )
}
