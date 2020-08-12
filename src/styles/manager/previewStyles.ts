import { convert, ThemeVars } from '@storybook/theming'
import { Parameters } from '../../typings'
import { createButtonStyles } from '../../utils/create-button-styles'
import { createDocsTableStyles } from '../../utils/create-docs-table-styles'
import { createPreviewColors } from '../../utils/create-preview-colors'
import { removeScrollStyles } from '../../utils/remove-scroll-styles'
import { elevationMap } from '../elevation'

const root = `.sb-show-main`
const preview = `${root} > #root`
const docs = `${root} > #docs-root > .sbdocs`
const docsPreview = `${docs} .sbdocs-preview`
const docsTitle = `${docs} .sbdocs-title`
const docsSubtitle = `${docs} .sbdocs-h2`
const docsUndertext = `${docs} .sbdocs-h3`
const docsText = `${docs} .sbdocs-title + div > p`
const docsTable = `${docs} .docblock-argstable`

export function enhancePreviewStyles(
  styles: { [key: string]: Record<string, any> },
  themeVars: ThemeVars,
  themeVariant: Parameters.ThemeVariantTypes,
  _ui: Parameters.UI,
  _docs: Parameters.Docs
) {
  const theme = convert(themeVars)
  const isDark = themeVariant === 'dark'

  const buttonStyles = createButtonStyles(theme)
  const docsTableStyles = createDocsTableStyles(theme, {docs: _docs, isDark})

  const colors = createPreviewColors(theme, { docs: _docs, isDark })
  const { color, background } = colors

  styles[`${root}`] = {
    backgroundColor: background.root,
    padding: '0 !important',
    fontFamily: theme.typography.fonts.base,
  }

  styles[`${preview}`] = {
    color: color.preview,
    fontFamily: theme.typography.fonts.base,
    padding: _ui.padding ? `${_ui.padding} !important` : '1rem',
  }

  styles[`${docs}`] = {
    background: background.docs,
  }

  styles[`${docsTitle}`] = {
    color: color.docs,
  }

  styles[`${docsSubtitle}`] = {
    color: color.docs,
    borderBottomColor: color.docsLight
  }

  styles[`${docsUndertext}`] = {
    color: color.docs,
  }

  styles[`${docsText}`] = {
    color: color.docs,
  }

  styles[`${docsTable}`] = {
    ...docsTableStyles
  }

  styles[`${docsPreview}`] = {
    backgroundColor: background.docsPreview,
    display: _docs.type === 'simple' ? 'none' : 'block',
    boxShadow: elevationMap[1],
    border: '0 none',

    // Panel Head
    '& > div.os-host:first-of-type': {
      backgroundColor: background.docsPreview,
      color: theme.color.defaultText,
      ...removeScrollStyles({
        styles: {
          '& > .os-padding > .os-viewport > .os-content > div > div:last-of-type a': {
            height: 'auto',
          },
        },
      }),
    },

    // Panel
    '& > div:last-of-type': {
      // Inner with story
      '& > div:first-of-type': {},
      // Utility area with button
      '& > div:last-of-type': {
        overflow: 'hidden',
        borderTopLeftRadius: theme.appBorderRadius,

        '& button': {
          ...buttonStyles,
          borderRadius: 0
        },
      },
    },

    // The Code in "show code"
    '& .os-host > .os-padding > .os-viewport > .os-content > pre > code': {
      fontFamily: theme.typography.fonts.mono
    },
  }

  return styles
}
