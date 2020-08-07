import { Global, themes } from '@storybook/theming'
import React from 'react'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'
import { createManagerStyles } from './manager/managerStyles'

export const ManagerStyles = () => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    parameters,
    state: { themeVariant, theme },
  } = settings

  const { ui, enhanceUi } = parameters

  const themeVars = theme || { ...themes[themeVariant] }
  const styles = {}

  if (enhanceUi) {
    createManagerStyles(styles, themeVars, themeVariant, ui)
  }

  return <Global styles={styles} />
}
