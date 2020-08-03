import { ThemeVars } from '@storybook/theming'
import { Parameters } from '../typings'

type ConvertParameterThemeToConfigThemeProps = {
  parameters: Parameters.Parameters
  themeConfig: Parameters.Theme
  themeVariant: Parameters.ThemeVariant
  converter: Parameters.ThemeConverter
  themeVariantName: Parameters.ThemeVariantTypes
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

  const isPlain = themeVariant && !themeVariant.theme && !themeVariant.override
  const theme = !isPlain ? themeVariant.theme : themeVariant
  const variantOverride: {} = !isPlain
    ? {
        ...(parameters.override || {}),
        ...(themeConfig.override || {}),
        ...(themeVariant.override || {}),
      }
    : {
        ...(parameters.override || {}),
        ...(themeConfig.override || {}),
      }

  const _override = Object.keys(variantOverride).length === 0 ? undefined : variantOverride
  const override = _override as ThemeVars | undefined

  const converted = converter({ theme, override, variant })

  return converted
}
