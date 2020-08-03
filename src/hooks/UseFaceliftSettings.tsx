import addons from '@storybook/addons'
import { useEffect, useState } from 'react'
import { ADDON_EVENT_THEME_CHANGE } from '../constants'
import { Settings } from '../typings'

export function useFaceliftSettings() {
  const [addonSettings, setAddonSettings] = useState<Settings.AddonSettings>()

  useEffect(() => {
    const chan = addons.getChannel()
    chan.on(ADDON_EVENT_THEME_CHANGE, setAddonSettings)
    return () => chan.off(ADDON_EVENT_THEME_CHANGE, setAddonSettings)
  })

  return addonSettings
}
