// eslint-disable-next-line no-use-before-define
import React from 'react'
import { Global, themes, Theme as StorybookTheme } from '@storybook/theming'
import { useFaceliftSettings } from '../index'
import { enhanceManagerStyles } from './manager/managerStyles'

export const ManagerStyles = () => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    parameters,
    state: { variant: themeVariant, theme },
  } = settings

  const { ui, enhanceUi, docs } = parameters

  const themeVars = theme || { ...themes[themeVariant] }
  let styles = {}

  if (enhanceUi) {
    styles = enhanceManagerStyles(styles, themeVars, themeVariant, ui, docs)
  }

  return enhanceUi ? <Global<StorybookTheme> styles={styles} /> : null
}
