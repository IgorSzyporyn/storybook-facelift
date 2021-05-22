import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'

import {
  AddonParameters,
  ThemeConverterFn,
  ParamTheme,
  ThemeVariantTypes,
  ThemeVariant,
} from '../typings/parameters'

export type ConvertParameterThemeToConfigThemeProps = {
  parameters: AddonParameters
  themeConfig: ParamTheme
  themeVariant: ThemeVariant
  converter: ThemeConverterFn
  themeVariantName: ThemeVariantTypes
}

export function convertParameterThemeToConfigTheme({
  parameters,
  themeConfig,
  themeVariant,
  converter,
  themeVariantName: variant,
}: ConvertParameterThemeToConfigThemeProps) {
  if (themeVariant === undefined) {
    return null
  }

  const theme = themeVariant
  const variantOverride: Record<string, any> = {
    ...(parameters.override || {}),
    ...(themeConfig.override || {}),
  }

  // eslint-disable-next-line no-underscore-dangle
  const _override = Object.keys(variantOverride).length === 0 ? undefined : variantOverride
  const override = _override as StorybookThemeOptions | undefined

  const converted = converter({
    theme,
    override,
    variant,
    background: themeConfig.background,
  })

  return converted
}
