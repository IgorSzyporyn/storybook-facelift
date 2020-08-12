import addons, { makeDecorator } from '@storybook/addons'
import React, { useEffect, useState } from 'react'
import { ADDON_EVENT_THEME_CHANGE, ADDON_PARAM_KEY } from './constants'
import { WithFaceliftPreview } from './components/WithFaceliftPreview'
import { Settings } from './typings'

export function useFaceliftSettings() {
  const [addonSettings, setAddonSettings] = useState<Settings.AddonSettings | null>(null)

  useEffect(() => {
    const chan = addons.getChannel()
    chan.on(ADDON_EVENT_THEME_CHANGE, setAddonSettings)
    return () => chan.off(ADDON_EVENT_THEME_CHANGE, setAddonSettings)
  })

  return addonSettings
}

export const withFacelift = makeDecorator({
  name: 'withFacelift',
  parameterName: ADDON_PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context) => {
    return <WithFaceliftPreview>{storyFn(context)}</WithFaceliftPreview>
  },
})
