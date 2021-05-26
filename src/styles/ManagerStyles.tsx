// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Global, Theme as StorybookTheme } from '@storybook/theming'
import { enhanceManagerStyles } from './manager/managerStyles'

import type { AddonState } from '../typings/internal/state'

type ManagerStylesProps = {
  addonState: AddonState | undefined
}

export const ManagerStyles = ({ addonState }: ManagerStylesProps) => {
  if (!addonState) {
    return null
  }

  const { parameters, themeVariant = 'light', themeKey, themes } = addonState
  const { ui, enhanceUi } = parameters

  const theme = themes[themeKey || '']
  let styles = {}

  if (theme && theme.storybook && enhanceUi) {
    const themeVars = theme.storybook[themeVariant]
    styles = enhanceManagerStyles({ styles, themeVars, themeVariant, uiParams: ui })
  }

  return enhanceUi ? <Global<StorybookTheme> styles={styles} /> : null
}
