import { create, themes } from '@storybook/theming'
import { createTheme } from 'badger-ui'

import type { ThemeVars } from '@storybook/theming'
import type { ThemeOptions as BadgerUiThemeConfig } from 'badger-ui'
import type { ThemeConverterFnProps, ThemeConverterFnResult } from '../../typings/internal/common'

export function createStorybookThemeFromBadgerUi({
  theme,
  override,
  variant,
}: ThemeConverterFnProps): ThemeConverterFnResult {
  if (theme === undefined) {
    return null
  }

  const options = { ...theme, type: variant } as BadgerUiThemeConfig
  const instanciated = createTheme<unknown>(options)

  const convertedThemeOptions: ThemeVars = {
    base: variant,
    colorPrimary: instanciated.color.primary.normal,
    colorSecondary: instanciated.color.secondary.normal,

    barBg: instanciated.background.surface.normal,
    barTextColor: instanciated.color.grey.darker,
    appBg: instanciated.background.body.normal,
    appContentBg: instanciated.background.surface.normal,
    appBorderColor: instanciated.color.border.lightest,
    appBorderRadius: Number(instanciated.metrics.borderRadius.replace('px', '')),
    // Typography
    fontBase: instanciated.typography.fontFamily,
    textColor: instanciated.typography.textColor,
    textInverseColor: instanciated.typography.textInverseColor,
    textMutedColor: instanciated.typography.textColorDimmed,

    inputBg: instanciated.background.surface.lightest,
    barSelectedColor: instanciated.color.secondary.normal,
    inputBorder: instanciated.color.border.normal,
    inputTextColor: instanciated.typography.textColor,
    ...override,
  }

  const defaultThemeOptions = themes[variant]

  const themeVars = {
    ...defaultThemeOptions,
    ...convertedThemeOptions,
    base: variant,
  }

  const storybook = create(themeVars)

  return { storybook, options, instanciated }
}
