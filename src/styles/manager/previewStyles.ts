/* eslint-disable no-param-reassign */
import { convert, ThemeVars } from '@storybook/theming'
import { createButtonStyles } from '../../utils/create-button-styles'
import { createDocsTableStyles } from '../../utils/create-docs-table-styles'
import { createPreviewColors } from '../../utils/create-preview-colors'
import { removeScrollStyles } from '../../utils/remove-scroll-styles'
import { elevationMap } from '../elevation'

import type { ParamDocs, ParamUi } from '../../typings/internal/parameters'
import { ThemeVariantType } from '../../typings/internal/parameters'

const root = `.sb-show-main`
const previewRoot = `.sb-show-main > #root`
const docsRoot = `.sb-show-main > #docs-root`
const docsWrapper = `${docsRoot} > .sbdocs-wrapper`
const docsContent = `${docsWrapper} > .sbdocs-content`
// const docsEmptyBlock = `${docs} .docbloc-emptyblock`
const docsParagraph = `${docsContent} .sbdocs-p`
const docsPreview = `${docsContent} .sbdocs-preview`
const docsTitle = `${docsContent} .sbdocs-title`
const docsListItem = `${docsContent} .sbdocs-li`
const docsSubtitle = `${docsContent} .sbdocs-h2`
const docsUndertext = `${docsContent} .sbdocs-h3`
const docsText = `${docsContent} .sbdocs-title + div > p`
const docsTable = `${docsContent} .docblock-argstable`
const docsStory = `${docsContent} .docs-story`
const docsStoryContent = `${docsStory} > div:first-of-type`
const docsStoryCodeButton = `${docsStory} > div:last-of-type`

const story = `${docsSubtitle}#stories ~ div`
const storyPreview = `${story} > .sbdocs-preview`

export function enhancePreviewStyles(
  styles: { [key: string]: Record<string, any> },
  themeVars: ThemeVars,
  themeVariant: ThemeVariantType,
  uiParams: ParamUi,
  docsParams: ParamDocs
) {
  const theme = convert(themeVars)
  const isDark = themeVariant === 'dark'

  const buttonStyles = createButtonStyles(theme)
  const docsTableStyles = createDocsTableStyles(theme, { params: docsParams, isDark })

  const colors = createPreviewColors(theme, { params: docsParams, isDark })
  const { color, background } = colors

  styles.section = {
    color: theme.color.defaultText,
  }

  styles[`${root}`] = {
    backgroundColor: background.root,
    padding: '0 !important',
    fontFamily: theme.typography.fonts.base,
  }

  styles[`${previewRoot}`] = {
    color: color.preview,
    fontFamily: theme.typography.fonts.base,
    padding: uiParams.padding ? `${uiParams.padding} !important` : '1rem',
  }

  styles[`${docsWrapper}`] = {
    background: background.docs,

    '& .sbdocs-preview': {
      color: color.docs,
    },

    '& .docblock-emptyblock ': {
      color: color.root,
      backgroundColor: background.docsTable,
      border: '0 none',
    },
  }

  styles[`${docsTitle}`] = {
    color: color.docs,
  }

  styles[`${docsListItem}`] = {
    color: color.docs,
  }

  styles[`${docsSubtitle}`] = {
    display: docsParams.hideStories || docsParams.type === 'simple' ? 'none' : 'inherit',
    color: color.docs,
    borderBottomColor: color.docsLight,
    marginBottom: '32px',
  }

  styles[`${docsUndertext}`] = {
    color: color.docs,
    display: docsParams.hideStories || docsParams.type === 'simple' ? 'none' : 'inherit',
  }

  styles[`${docsText}`] = {
    color: color.docs,
  }

  styles[`${docsTable}`] = {
    ...docsTableStyles,
  }

  styles[`${docsParagraph}`] = {
    color: color.docs,
  }

  styles[`${storyPreview}`] = {
    backgroundColor: background.docsPreview,
    display: docsParams.hideStories || docsParams.type === 'simple' ? 'none' : 'inherit',
    boxShadow: elevationMap[1],
    border: '0 none',

    '& > div': {
      // Utility area with button
      '& > div:last-of-type': {
        overflow: 'hidden',
        borderTopLeftRadius: theme.appBorderRadius,

        '& button': {
          ...buttonStyles,
          borderRadius: 0,
        },
      },
    },
  }

  styles[`${docsStoryContent}`] = {
    margin: 0,

    '& > div': {
      marginBottom: theme.layoutMargin * 2.5,
    },
  }

  styles[`${docsStoryCodeButton}`] = {
    overflow: 'hidden',
    borderTopLeftRadius: theme.appBorderRadius,

    '& button': {
      ...buttonStyles,
      borderRadius: 0,
    },
  }

  styles[`${docsPreview}`] = {
    backgroundColor: background.docsPreview,
    display: docsParams.type === 'simple' ? 'none' : 'block',
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

    // Code
    '& > div:nth-of-type(3)': {
      // Inner with story
      '& > div:first-of-type': {},
      // Utility area with button
      '& > div:last-of-type': {
        overflow: 'hidden',
        borderTopLeftRadius: theme.appBorderRadius,

        '& button': {
          ...buttonStyles,
          borderRadius: 0,
        },
      },
    },

    // The Code in "show code"
    '& .os-host > .os-padding > .os-viewport > .os-content > pre > code': {
      fontFamily: theme.typography.fonts.mono,
    },
  }

  return styles
}
