import { convert, Global, themes } from '@storybook/theming'
import React from 'react'
import { useFaceliftSettings } from '../hooks/UseFaceliftSettings'

const root = `.sb-show-main`
const previewRoot = `${root} > #root`
const docsRoot = `${root} > #docs-root > .sbdocs`
const docsPreview = `${docsRoot} .sbdocs-preview`
const docsTitle = `${docsRoot} .sbdocs-title`
const docsTable = `${docsRoot} .docblock-argstable`

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

  return theme ? (
    <Global
      styles={{
        [`${root}`]: {
          backgroundColor: theme.background.content,
          padding: main.padding ? `${main.padding} !important` : '1rem',
          fontFamily: theme.typography.fonts.base,
        },
        [`${previewRoot}`]: {
          color: theme.color.defaultText,
        },
        [`${docsRoot}`]: {
          backgroundColor: theme.background.content,
          background: theme.background.content,
        },
        [`${docsTitle}`]: {
          color: theme.color.defaultText,
        },
        [`${docsTable}`]: {
          color: theme.color.defaultText,

          '&-head tr th': {
            color: theme.color.defaultText,
          },

          '&-body': {
            // First row
            '& tr:first-of-type': {
              '& td:first-of-type': {
                borderTopLeftRadius: theme.appBorderRadius,
              },
              '& td:last-child': {
                borderTopLeftRadius: theme.appBorderRadius,
                borderBottomRightRadius: 0,
              },
            },
            // All other rows
            '& tr:not(:first-of-type):not(:last-child)': {
              '& td': {
                borderRadius: 0,
              },
            },
            // Last row
            '& tr:last-child': {
              '& td:first-of-type': {
                borderBottomLeftRadius: theme.appBorderRadius,
              },
              '& td:last-child': {
                borderBottomLeftRadius: theme.appBorderRadius,
              },
            },

            '& tr': {
              '&:not(:first-of-type)': {
                borderTop: `1px solid ${theme.background.bar}`,
              },
              '& td': {
                color: theme.barTextColor,
                backgroundColor: theme.background.app,
                lineHeight: '20px',
                paddingTop: '22px',
                paddingBottom: '22px',
              },
              '& td:first-of-type': {
                paddingLeft: '22px !important',
                paddingTop: '2px',
                paddingBottom: 0,
                lineHeight: '62px',
              },
              '& td:nth-of-type(2)': {
                '& > div > span': {
                  color: theme.color.defaultText,
                  paddingRight: '25px',
                },
              },
              '& td:last-child': {
                paddingLeft: '22px !important',
              },
            },
          },
        },
        [`${docsPreview}`]: {
          backgroundColor: 'transparent',
          display: docs === 'simple' ? 'none' : 'block',

          // Panel Head
          '& > .os-host': {
            backgroundColor: theme.background.bar,
            color: theme.color.defaultText,
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
