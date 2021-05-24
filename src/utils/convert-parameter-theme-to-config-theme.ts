import {
  AddonStateParameters,
  ThemeConverterFn,
  ParamTheme,
  ThemeVariantType,
  ThemeOptions,
  ThemeOptionsOverride,
} from '../typings/internal/parameters'

export type ConvertParameterThemeToConfigThemeProps = {
  parameters: AddonStateParameters
  themeConfig: ParamTheme
  themeVariant: ThemeOptions
  converter: ThemeConverterFn
  themeVariantName: ThemeVariantType
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
  const override = _override as ThemeOptionsOverride | undefined

  const converted = converter({
    theme: themeVariant,
    override,
    variant,
    background: themeConfig.background,
  })

  return converted
}
