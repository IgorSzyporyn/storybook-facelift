import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'

import {
  AddonStateParameters,
  ThemeConverterFn,
  ParamTheme,
  ThemeVariantTypes,
  ThemeVariant,
} from '../typings/parameters'

export type ConvertParameterThemeToConfigThemeProps = {
  parameters: AddonStateParameters
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

  const variantOverride: Record<string, unknown> = {
    ...(parameters.override || {}),
    ...(themeConfig.override || {}),
  }

  // eslint-disable-next-line no-underscore-dangle
  const _override = Object.keys(variantOverride).length === 0 ? undefined : variantOverride
  const override = _override as StorybookThemeOptions | undefined

  const converted = converter({
    theme: themeVariant,
    override,
    variant,
    background: themeConfig.background,
  })

  return converted
}
