import { ThemeVars as StorybookThemeOptions } from '@storybook/theming'

import {
  AddonStateParameters,
  ThemeConverterFn,
  ParamTheme,
  ThemeVariantTypes,
  ThemeVariant,
} from '../typings/internal/parameters'

export type ConvertParameterThemeToConfigThemeProps<T> = {
  parameters: AddonStateParameters
  themeConfig: ParamTheme
  themeVariant: ThemeVariant | T
  converter: ThemeConverterFn<T>
  themeVariantName: ThemeVariantTypes
}

export function convertParameterThemeToConfigTheme<T = Record<string, unknown>>({
  parameters,
  themeConfig,
  themeVariant,
  converter,
  themeVariantName: variant,
}: ConvertParameterThemeToConfigThemeProps<T>) {
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
