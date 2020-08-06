import { convert, Global, themes } from '@storybook/theming'
import React from 'react'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'
import { bestContrastColor } from '../utils/best-contrast-color'
import { darken } from '@material-ui/core'
import { removeScrollStyles } from '../utils/remove-scroll-styles'

const root = `.sb-show-main`
const previewRoot = `${root} > #root`
const docsRoot = `${root} > #docs-root > .sbdocs`
const docsPreview = `${docsRoot} .sbdocs-preview`
const docsTitle = `${docsRoot} .sbdocs-title`
const docsTable = `${docsRoot} .docblock-argstable`
const docsTableHead = `${docsTable}-head`
const docsTableBody = `${docsTable}-body`
const docsTableBodyRow = `${docsTableBody} tr`
const docsTableBodyRowCell = `${docsTableBody} td`

const docsTableBodyRowCellTitle = `${docsTableBodyRowCell}:first-of-type`
const docsTableBodyRowCellDescription = `${docsTableBodyRowCell}:nth-of-type(2)`
const docsTableBodyRowCellDefault = `${docsTableBodyRowCell}:last-of-type`

export const PreviewStyles = () => {
  const settings = useFaceliftSettings()

  if (!settings) {
    return null
  }

  const {
    state: { themeVariant, theme: _theme },
  } = settings
  const themeVars = _theme || { ...themes[themeVariant] }
  const theme = convert(themeVars)

  const { parameters } = settings
  const { docs, main } = parameters

  const isDark = themeVariant === 'dark'

  const docsBackground = isDark ? theme.background.content : '#FFFFFF'
  const docsBaseColor = bestContrastColor({
    color1: theme.color.defaultText,
    color2: theme.color.inverseText,
    background: docsBackground,
  })

  const docsColor = isDark ? darken(docsBaseColor, 0.2) : 'inherit'
  const docsPropertiesColor = docsBaseColor
  const borderRadius = theme.appBorderRadius
  const docsTablePropertyBorder = docs.hidePropertyBorders
    ? 'transparent'
    : isDark
    ? darken(theme.background.content, 0.1)
    : '#e9e9e9'
  const docsTableCodeBackground = isDark ? 'transparent' : '#f8f8f8'
  const docsTableCodeBorder = isDark ? docsColor : '#eeeeee'
  const docsTableCodeColor = isDark ? docsColor : 'rgba(51,51,51,0.9)'

  return theme ? (
    <Global
      styles={{
        [`${root}`]: {
          backgroundColor: theme.background.content,
          padding: '0 !important',
          fontFamily: theme.typography.fonts.base,
        },
        [`${previewRoot}`]: {
          color: theme.color.defaultText,
          padding: main.padding ? `${main.padding} !important` : '1rem',
        },
        [`${docsRoot}`]: {
          backgroundColor: theme.background.content,
          background: theme.background.content,
        },
        [`${docsTitle}`]: {
          color: theme.color.defaultText,
        },
        [`${docsTable}`]: {},
        [`${docsTableHead}`]: {
          '& tr th': {
            color: theme.color.defaultText,
          },

          '& tr': {
            '& th:first-of-type': { width: 'auto', minWidth: '150px' },
            '& th:nth-of-type(2)': { paddingLeft: '30px', paddingRight: '30px' },
            '& th:last-of-type': {
              minWidth: '80px',
              maxWidth: 'initial',
              width: 'auto',
              paddingLeft: '0px',
            },
          },
        },
        [`${docsTableBody}`]: {},
        [`${docsTableBodyRow}`]: {
          // Fix border radius problems and set themes borderRadius
          '&:first-of-type': {
            '& td:first-of-type': { borderTopLeftRadius: borderRadius },
            '& td:last-child': { borderBottomRightRadius: 0 },
          },
          '&:not(:first-of-type):not(:last-of-type)': {
            '& td': { borderRadius: 0 },
          },
          '&:last-of-type': {
            '& td:first-of-type': { borderBottomLeftRadius: borderRadius },
            '& td:last-child': { borderBottomRightRadius: borderRadius },
          },
          // Set the border color between docs table rows
          '&:not(:first-of-type)': {
            borderTopColor: docsTablePropertyBorder,
          },
        },
        [`${docsTableBodyRowCell}`]: {
          color: docsColor,
          background: docsBackground,
          lineHeight: '20px',
          paddingTop: '22px',
          paddingBottom: '22px',
        },
        [`${docsTableBodyRowCellTitle}`]: {
          paddingLeft: '22px !important',
          paddingTop: '2px',
          paddingBottom: 0,
          lineHeight: '62px',
          width: 'auto',

          '& *': {
            whiteSpace: 'nowrap',
          },
        },
        [`${docsTableBodyRowCellDescription}`]: {
          paddingLeft: '30px',
          paddingRight: '30px',
          width: 'auto',

          '& div + div': {
            marginTop: '22px',
          },

          '& > div:last-of-type > span': {
            color: docsPropertiesColor,
          },

          '& code': {
            margin: '0 2px',
            padding: '3px 8px',
            backgroundColor: docsTableCodeBackground,
            color: docsTableCodeColor,
            borderColor: docsTableCodeBorder,
          },

          '& a': {
            color: theme.color.secondary,
            fontWeight: theme.typography.weight.bold,
            textDecoration: 'none',
          },
        },
        [`${docsTableBodyRowCellDefault}`]: {
          paddingLeft: '0px',
          width: 'auto',
          minWidth: 'initial',
          maxWidth: 'initial',
        },
        [`${docsPreview}`]: {
          backgroundColor: 'transparent',
          display: docs.type === 'simple' ? 'none' : 'block',

          // Panel Head
          '& > .os-host': {
            backgroundColor: theme.background.bar,
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
            backgroundColor: theme.background.bar,
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
                  backgroundColor: theme.color.primary,
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
        },
      }}
    />
  ) : null
}
