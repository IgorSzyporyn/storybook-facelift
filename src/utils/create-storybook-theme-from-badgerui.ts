import { create, themes } from '@storybook/theming'
import { createTheme } from 'badger-ui'

import type { ThemeVars } from '@storybook/theming'
import type { ThemeOptions } from 'badger-ui'
import type { Parameters } from '../typings'

export function createStorybookThemeFromBadgerUi({
  theme: _themeOptions,
  override,
  variant,
}: Parameters.ThemeConverterProps) {
  if (_themeOptions === undefined) {
    return null
  }

  const original = _themeOptions as ThemeOptions
  const instanciated = createTheme({ ...original, type: variant })

  const convertedThemeOptions: ThemeVars = {
    base: variant,
    colorPrimary: instanciated.color.primary.normal,
    colorSecondary: instanciated.color.secondary.normal,
    barBg: instanciated.background.surface.normal,
    barTextColor: instanciated.color.grey.darker,
    appBg: instanciated.background.body.normal,
    appContentBg: instanciated.background.surface.normal,
    appBorderColor:
      variant === 'dark' ? instanciated.color.border.muted : instanciated.color.border.dark,
    appBorderRadius: Number(instanciated.metrics.borderRadius.replace('px', '')),
    textColor: instanciated.typography.textColor,
    textInverseColor: instanciated.typography.textInverseColor,
    textMutedColor: instanciated.typography.textColorMuted,
    inputBg: instanciated.background.surface.lightest,
    barSelectedColor: instanciated.color.secondary.normal,
    inputBorder:
      variant === 'dark'
        ? instanciated.background.surface.darkest
        : instanciated.color.border.normal,
    inputTextColor: instanciated.typography.textColor,
    ...override,
  }

  const defaultThemeOptions = themes[variant]

  const themeVars = {
    ...defaultThemeOptions,
    ...convertedThemeOptions,
    base: variant,
  }

  const converted = create(themeVars)

  return { converted, original: themeVars, instanciated }
}
