import { Global, themes, Theme as StorybookTheme } from '@storybook/theming'
import React from 'react'
import { useFaceliftSettings } from '../index'
import { enhanceManagerStyles } from './manager/managerStyles'

export const ManagerStyles = () => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    parameters,
    state: { themeVariant, theme },
  } = settings

  const { ui, enhanceUi, docs } = parameters

  const themeVars = theme || { ...themes[themeVariant] }
  const styles = {}

  if (enhanceUi) {
    enhanceManagerStyles(styles, themeVars, themeVariant, ui, docs)
  }

  return enhanceUi ? <Global<StorybookTheme> styles={styles} /> : null
}
