import { getContrastRatio, lighten } from '@material-ui/core'
import {
  convert,
  Theme as StorybookTheme,
  ThemeVars as StorybookThemeOptions,
} from '@storybook/theming'
import { Parameters } from '../../typings'
import { bestContrastColor } from '../../utils/best-contrast-color'
import { setColorOpacity } from '../../utils/color'
import { removeScrollStyles } from '../../utils/remove-scroll-styles'
import { elevationMap } from '../elevation'

const root = `.sb-show-main`
const preview = `${root} > #root`
const docs = `${root} > #docs-root > .sbdocs`
const docsPreview = `${docs} .sbdocs-preview`
const docsTitle = `${docs} .sbdocs-title`
const docsTable = `${docs} .docblock-argstable`
const docsTableHead = `${docsTable}-head`
const docsTableBody = `${docsTable}-body`
const docsTableBodyRow = `${docsTableBody} tr`
const docsTableBodyRowCell = `${docsTableBody} td`
const docsTableBodyRowCellTitle = `${docsTableBodyRowCell}:first-of-type`
const docsTableBodyRowCellDescription = `${docsTableBodyRowCell}:nth-of-type(2)`
const docsTableBodyRowCellDefault = `${docsTableBodyRowCell}:nth-of-type(3)`
const docsTableBodyRowCellControl = `${docsTableBodyRowCell}:nth-of-type(4)`

const createInputStyles = (theme: StorybookTheme) => {
  return {
    boxSizing: 'content-box',
    backgroundColor: theme.input.background,
    color: theme.input.color,
    borderRadius: theme.input.borderRadius,
    padding: '6px 10px',
    boxShadow: `${theme.input.border} 0 0 0 1px inset`,
    transition: 'all 200ms ease-out',

    '&:focus': {
      boxShadow: `${theme.color.secondary} 0 0 0 1px inset`,
    },
  }
}

export function enhancePreviewStyles(
  styles: { [key: string]: Record<string, any> },
  themeVars: StorybookThemeOptions,
  themeVariant: Parameters.ThemeVariantTypes,
  _ui: Parameters.UI,
  _docs: Parameters.Docs
) {
  const theme = convert(themeVars)
  const isDark = themeVariant === 'dark'

  const background = {
    root: theme.background.content,
    preview: theme.background.content,
    docs: theme.background.content,
    docsPreview: isDark
      ? lighten(theme.background.content, 0.04)
      : lighten(theme.background.content, 0.6),
    docsTable: isDark
      ? lighten(theme.background.content, 0.04)
      : lighten(theme.background.content, 0.6),
  }

  const color = {
    root: theme.color.defaultText,
    preview: theme.color.defaultText,
    docs: theme.color.defaultText,
    rootLight: setColorOpacity(theme.color.defaultText, 0.7),
    docsLight: setColorOpacity(theme.color.defaultText, 0.7),
    docsTableLight: setColorOpacity(theme.color.defaultText, 0.7),
  }

  const border = {
    radius: theme.appBorderRadius,
    color: _docs.hidePropertyBorders ? 'transparent' : 'rgba(0,0,0,0.1)',
  }

  const rootRatio = getContrastRatio(color.root, background.root)
  if (rootRatio < 10) {
    color.root = bestContrastColor({
      color1: color.root,
      background: background.root,
      ratio: 10,
    })
  }

  const previewRatio = getContrastRatio(color.preview, background.preview)
  if (previewRatio < 10) {
    color.preview = bestContrastColor({
      color1: color.preview,
      background: background.preview,
      ratio: 10,
    })
  }

  const docsRatio = getContrastRatio(color.docs, background.docs)
  if (docsRatio < 10) {
    color.docs = bestContrastColor({
      color1: color.docs,
      background: background.docs,
      ratio: 10,
    })
  }

  const rootLightRatio = getContrastRatio(color.rootLight, background.root)
  if (rootLightRatio < 6) {
    color.rootLight = bestContrastColor({
      color1: color.rootLight,
      background: background.root,
      ratio: 6,
    })
  }

  const docsLightRatio = getContrastRatio(color.docsLight, background.docs)
  if (docsLightRatio < 6) {
    color.docsLight = bestContrastColor({
      color1: color.docsLight,
      background: background.docs,
      ratio: 6,
    })
  }

  const docsTableLightRatio = getContrastRatio(color.docsTableLight, background.docsTable)
  if (docsTableLightRatio < 6) {
    color.docsLight = bestContrastColor({
      color1: color.docsTableLight,
      background: background.docsTable,
      ratio: 6,
    })
  }

  const docsTablePaddingOuter = 20
  const docsTablePaddingInner = 15

  const docsTableBodyRowInputHeight = 32
  const docsTableBodyRowHeight = 64

  const inputStyles = createInputStyles(theme)

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

  styles[`${docsTable}`] = {}

  styles[`${docsTableHead}`] = {
    '& tr th': {
      color: color.docsLight,

      '&:first-of-type': {
        width: 'auto',
        minWidth: '130px',
        paddingLeft: docsTablePaddingOuter,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(2)': {
        width: 'auto',
        display: _docs.hideDescription ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(3)': {
        width: 'auto',
        display: _docs.hideDefaults ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,

        '&:last-of-type': {
          paddingRight: docsTablePaddingOuter,
        },
      },
      '&:nth-of-type(4)': {
        width: 'auto',
        minWidth: '225px',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingOuter,
      },
    },

    '& button': {
      color: '#ffffff',
      background: theme.color.secondary,
      boxShadow: 'none',
    },
  }

  styles[`${docsTableBody}`] = {
    color: color.docs,
    borderRadius: border.radius,
    boxShadow: elevationMap[1],
  }

  // Fix border radius problems and set themes borderRadius
  styles[`${docsTableBodyRow}`] = {
    '& td': {
      '&:first-of-type': {
        width: 'auto',
        paddingLeft: docsTablePaddingOuter,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(2)': {
        width: 'auto',
        display: _docs.hideDescription ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(3)': {
        width: 'auto',
        display: _docs.hideDefaults ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,

        '&:last-of-type': {
          paddingRight: docsTablePaddingOuter,
        },
      },
      '&:nth-of-type(4)': {
        width: 'auto',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingOuter,
      },
    },

    '&:first-of-type': {
      '& td:first-of-type': { borderTopLeftRadius: border.radius },
      '& td:last-child': { borderBottomRightRadius: 0 },
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      '& td': { borderRadius: 0 },
    },
    '&:last-of-type': {
      '& td:first-of-type': { borderBottomLeftRadius: border.radius },
      '& td:last-child': { borderBottomRightRadius: border.radius },
    },
    '&:not(:first-of-type)': { borderTopColor: border.color },
  }

  styles[`${docsTableBodyRowCell}`] = {
    color: color.docs,
    background: background.docsTable,
    width: 'auto',
    paddingTop: `${(docsTableBodyRowHeight - docsTableBodyRowInputHeight) / 2}px`,
    paddingBottom: `${(docsTableBodyRowHeight - docsTableBodyRowInputHeight) / 2}px`,

    '& > span': {
      lineHeight: `${docsTableBodyRowInputHeight}px`,
    },
  }

  styles[`${docsTableBodyRowCellTitle}`] = {
    '& > span': {
      fontWeight: 500,
    },
  }

  styles[`${docsTableBodyRowCellDescription}`] = {
    color: color.docsTableLight,

    // Container for description text
    '& > div:first-of-type': {
      marginTop: '7px',
    },

    // Container for properties
    '& div + div': {
      marginTop: '22px',
    },

    // Each property span container
    '& > div > div > span': {
      ...(isDark
        ? {
            backgroundColor: lighten(background.docs, 0.1),
            color: color.docsLight,
            borderColor: color.docsLight,
          }
        : {}),
      lineHeight: '16px',
      paddingTop: '4px',
      paddingLeft: '6px',
      paddingRight: '6px',
      marginRight: '6px',
      marginBottom: '6px',
    },

    '& code': {
      margin: '0 2px',
      padding: '3px 8px',
      backgroundColor: background.docsTable,
      color: color.docsLight,
      borderColor: color.docsLight,
    },

    '& a': {
      color: theme.color.secondary,
      fontWeight: theme.typography.weight.bold,
      textDecoration: 'none',
    },
  }

  styles[`${docsTableBodyRowCellDefault}`] = {}

  styles[`${docsTableBodyRowCellControl}`] = {
    '& input': {
      ...inputStyles,
    },
    '& textarea': {
      ...inputStyles,
    },
    '& select': {
      ...inputStyles,
      width: 'calc(100% - 40px)',
      paddingRight: '30px',
    },
    '& > label': {
      marginBottom: 0,
      display: 'flex',
      minHeight: `${docsTableBodyRowInputHeight}px`,

      '& input[type="checkbox"]': {
        background: 'transparent',
        borderRadius: '32px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      },
      '& input[type="checkbox"] ~ span': {
        color: color.docs,
        boxShadow: 'none',
        flexBasis: '50%',
        lineHeight: `14px`,
      },
    },

    '& span > svg': {
      right: '10px',
    },
  }

  styles[`${docsPreview}`] = {
    backgroundColor: background.docsPreview,
    display: _docs.type === 'simple' ? 'none' : 'block',
    boxShadow: elevationMap[1],
    border: '0 none',

    // Panel Head
    '& > .os-host': {
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

    // Panel Bodies (preview and source)
    '& > .os-host ~ div': {
      backgroundColor: background.docsPreview,
      color: theme.color.defaultText,

      '& div': {
        // Main content area
        '&:first-of-type': {},
        // Show code button area
        '&:last-child': {
          backgroundColor: 'transparent',
          overflow: 'hidden',
          borderTopLeftRadius: theme.appBorderRadius,

          '& button': {
            backgroundColor: theme.color.secondary,
            color: theme.color.lightest,
            borderRadius: 0,
            fontWeight: 500,
            lineHeight: '26px',
            height: '28px',
            border: '0 none',
            padding: '0 15px',
            minWidth: '95px',
            textAlign: 'center',
            display: 'inline-block',
          },
        },
      },
    },

    // Panel Source only
    '& > .os-host + div + div': {
      backgroundColor: '#272727',
      borderTopLeftRadius: 0,
    },
  }

  return styles
}
