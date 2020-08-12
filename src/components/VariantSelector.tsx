import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { IconButton } from '@storybook/components'
import React from 'react'
import { ADDON_VARIANT_SELECTOR } from '../constants'
import { useFaceliftSettings } from '../index'

type VariantSelectorProps = {
  onClick: () => void
}

export const VariantSelector = ({ onClick }: VariantSelectorProps) => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const { config, state } = settings
  const { themeName, themeVariant } = state

  const themes = config.themes
  const themeConfig = themes[themeName]

  if (!themeConfig) {
    return null
  }

  const isDark = themeVariant === 'dark'
  const oppositeVariant = isDark ? 'light' : 'dark'
  const hasOppositeVariant = themeConfig[oppositeVariant] !== undefined

  return (
    <IconButton
      key={ADDON_VARIANT_SELECTOR}
      style={{
        display: !hasOppositeVariant ? 'none' : 'inline-flex',
      }}
      disabled={!hasOppositeVariant}
      title={`Switch to ${oppositeVariant}`}
      onClick={onClick}
    >
      {isDark ? <WbSunnyIcon /> : <Brightness2Icon />}
    </IconButton>
  )
}
