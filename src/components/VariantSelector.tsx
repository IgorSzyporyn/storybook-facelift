import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { useAddonState } from '@storybook/api'
import { IconButton } from '@storybook/components'
import React from 'react'
import { ADDON_ID, ADDON_VARIANT_SELECTOR } from '../constants'
import { useThemedState } from '../hooks/UseThemedState'
import { Parameters, Settings } from '../typings'

type VariantSelectorProps = {
  onClick: () => void
}

export const VariantSelector = ({ onClick }: VariantSelectorProps) => {
  const [settings] = useAddonState<Settings.Settings>(ADDON_ID)
  const { themeName: name, themeVariant: variant } = useThemedState()

  let hasOppositeVariant = false
  let isDark = false
  let oppositeVariant: Parameters.ParameterThemeVariantTypes = 'dark'

  if (settings && name && variant) {
    const { config } = settings
    const { themes } = config
    const themeConfig = themes[name]

    isDark = variant === 'dark'

    oppositeVariant = isDark ? 'light' : 'dark'

    hasOppositeVariant = themeConfig[oppositeVariant] !== undefined
  }

  return (
    <IconButton
      key={ADDON_VARIANT_SELECTOR}
      hidden={!hasOppositeVariant}
      title={`Switch to ${oppositeVariant}`}
      onClick={onClick}
    >
      {isDark ? <WbSunnyIcon /> : <Brightness2Icon />}
    </IconButton>
  )
}
