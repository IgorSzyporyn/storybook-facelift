import { Global, themes, Theme as StorybookTheme } from '@storybook/theming'
import React from 'react'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'
import { enhancePreviewStyles } from './manager/previewStyles'

export const PreviewStyles = () => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    parameters,
    state: { themeVariant, theme },
  } = settings

  const { docs, ui, enhanceUi } = parameters

  const themeVars = theme || { ...themes[themeVariant] }
  const styles = {}

  if (enhanceUi) {
    enhancePreviewStyles(styles, themeVars, themeVariant, ui, docs)
  }

  return enhanceUi ? <Global<StorybookTheme> styles={styles} /> : null
}
