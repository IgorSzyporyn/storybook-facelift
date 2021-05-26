// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Global, Theme as StorybookTheme } from '@storybook/theming'
import { enhancePreviewStyles } from './manager/previewStyles'

import type { AddonState } from '../typings/internal/state'

type PreviewStylesProps = {
  addonState: AddonState | null
}

export const PreviewStyles = ({ addonState }: PreviewStylesProps) => {
  if (!addonState) {
    return null
  }

  const { parameters, themeVariant = 'light', themeKey, themes } = addonState
  const { docs, ui, enhanceUi } = parameters

  const theme = themes[themeKey || '']
  let styles = {}

  if (theme && theme.storybook && enhanceUi) {
    const themeVars = theme.storybook[themeVariant]

    styles = enhancePreviewStyles({
      docsParams: docs,
      styles,
      themeVariant,
      themeVars,
      uiParams: ui,
    })
  }

  return enhanceUi ? <Global<StorybookTheme> styles={styles} /> : null
}
