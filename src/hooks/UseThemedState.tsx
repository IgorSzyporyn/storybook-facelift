import addons from '@storybook/addons'
import { ThemeVars } from '@storybook/theming'
import { useEffect, useState } from 'react'
import { ADDON_EVENT_THEME_CHANGE } from '../constants'
import { Parameters } from '../typings'

export type UseThemedState = {
  theme?: ThemeVars
  themeName?: string
  themeOriginal?: Parameters.ParameterThemeOriginal
  themeType?: Parameters.ParameterThemeTypes
  themeVariant?: Parameters.ParameterThemeVariantTypes
}

export function useThemedState() {
  const [theme, setTheme] = useState<UseThemedState>({})

  useEffect(() => {
    const chan = addons.getChannel()
    chan.on(ADDON_EVENT_THEME_CHANGE, setTheme)
    return () => chan.off(ADDON_EVENT_THEME_CHANGE, setTheme)
  })

  return theme
}
