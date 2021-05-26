import type {
  ThemeOptions,
  ThemeOptionsOverride,
  ThemeConverterFn,
  ThemeConverterFnResult,
  ThemeVariantType,
} from '../typings/internal/common'
import type { AddonParameters, ParamTheme } from '../typings/internal/parameters'

export type ConvertParameterThemeToConfigThemeProps = {
  parameters: AddonParameters
  themeConfig: ParamTheme
  themeVariant: ThemeOptions
  converter?: ThemeConverterFn
  themeVariantName: ThemeVariantType
}

export function createStateThemeConvertFromParameters({
  parameters,
  themeConfig,
  themeVariant,
  converter,
  themeVariantName: variant,
}: ConvertParameterThemeToConfigThemeProps) {
  let converted: ThemeConverterFnResult | undefined

  if (themeVariant === undefined) {
    return converted
  }

  const variantOverride: Record<string, unknown> = {
    ...(parameters.override || {}),
    ...(themeConfig.override || {}),
  }

  // eslint-disable-next-line no-underscore-dangle
  const _override = Object.keys(variantOverride).length === 0 ? undefined : variantOverride
  const override = _override as ThemeOptionsOverride | undefined

  if (converter) {
    converted = converter({
      theme: themeVariant,
      override,
      variant,
      background: themeConfig.background,
    })
  }

  return converted
}
