// eslint-disable-next-line no-use-before-define
import React from 'react'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import WbSunnyIcon from '@material-ui/icons/WbSunny'
import { IconButton } from '@storybook/components'
import { ADDON_VARIANT_SELECTOR } from '../constants'

import type { AddonState } from '../typings/internal/state'

type VariantSelectorProps = {
  onClick: () => void
  addonState: AddonState | undefined
}

export const VariantSelector = ({ addonState, onClick }: VariantSelectorProps) => {
  if (!addonState) {
    return null
  }

  const { themeVariant, themeKey, themes } = addonState

  const themeConfig = themes[themeKey || '']

  if (!themeConfig) {
    return null
  }

  const isDark = themeVariant === 'dark'
  const oppositeVariant = isDark ? 'light' : 'dark'
  const hasOppositeVariant = themeConfig.storybook[oppositeVariant] !== undefined

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
