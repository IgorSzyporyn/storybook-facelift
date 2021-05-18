import { getContrastRatio, lighten } from '@material-ui/core'
import { Theme as StorybookTheme } from '@storybook/theming'
import { Parameters } from '../typings'
import { bestContrastColor } from './best-contrast-color'
import { setColorOpacity } from './color'

type CreatePreviewColorsOptions = {
  params: Parameters.Docs
  isDark: boolean
}

export function createPreviewColors(
  theme: StorybookTheme,
  { params, isDark }: CreatePreviewColorsOptions
) {
  const colors = {
    background: {
      root: theme.background.content,
      preview: theme.background.content,
      docs: theme.background.content,
      docsPreview: isDark
        ? lighten(theme.background.content, 0.04)
        : lighten(theme.background.content, 0.6),
      docsTable: isDark
        ? lighten(theme.background.content, 0.04)
        : lighten(theme.background.content, 0.6),
    },
    color: {
      root: theme.color.defaultText,
      preview: theme.color.defaultText,
      docs: theme.color.defaultText,
      rootLight: setColorOpacity(theme.color.defaultText, 0.7),
      docsLight: setColorOpacity(theme.color.defaultText, 0.7),
      docsTableLight: setColorOpacity(theme.color.defaultText, 0.7),
    },
    border: {
      radius: theme.appBorderRadius,
      color: params.hidePropertyBorders ? 'transparent' : 'rgba(0,0,0,0.1)',
    },
  }

  const rootRatio = getContrastRatio(colors.color.root, colors.background.root)
  if (rootRatio < 10) {
    colors.color.root = bestContrastColor({
      color1: colors.color.root,
      background: colors.background.root,
      ratio: 10,
    })
  }

  const previewRatio = getContrastRatio(colors.color.preview, colors.background.preview)
  if (previewRatio < 10) {
    colors.color.preview = bestContrastColor({
      color1: colors.color.preview,
      background: colors.background.preview,
      ratio: 10,
    })
  }

  const docsRatio = getContrastRatio(colors.color.docs, colors.background.docs)
  if (docsRatio < 10) {
    colors.color.docs = bestContrastColor({
      color1: colors.color.docs,
      background: colors.background.docs,
      ratio: 10,
    })
  }

  const rootLightRatio = getContrastRatio(colors.color.rootLight, colors.background.root)
  if (rootLightRatio < 6) {
    colors.color.rootLight = bestContrastColor({
      color1: colors.color.rootLight,
      background: colors.background.root,
      ratio: 6,
    })
  }

  const docsLightRatio = getContrastRatio(colors.color.docsLight, colors.background.docs)
  if (docsLightRatio < 6) {
    colors.color.docsLight = bestContrastColor({
      color1: colors.color.docsLight,
      background: colors.background.docs,
      ratio: 6,
    })
  }

  const docsTableLightRatio = getContrastRatio(
    colors.color.docsTableLight,
    colors.background.docsTable
  )
  if (docsTableLightRatio < 6) {
    colors.color.docsLight = bestContrastColor({
      color1: colors.color.docsTableLight,
      background: colors.background.docsTable,
      ratio: 6,
    })
  }

  return colors
}
