import { convert, Global, themes } from '@storybook/theming'
import React from 'react'
import { useThemedState } from '../hooks/UseThemedState'

const root = `.sb-show-main`
const previewRoot = `${root} > #root`
const docsRoot = `${root} > #docs-root > .sbdocs`

export const PreviewStyles = () => {
  const { themeVariant: _variant = 'light', theme: _theme } = useThemedState()

  const themeVars = _theme || { ...themes[_variant] }
  const theme = convert(themeVars)

  // const { docs } = settings

  return theme ? (
    <Global
      styles={{
        [`${root}`]: {},
        [`${previewRoot}`]: {
          color: theme.color.defaultText,
        },
        [`${docsRoot}`]: {
          backgroundColor: theme.background.content,

          // Docs title
          '& .sbdocs-title': {
            color: theme.color.defaultText,
          },

          // Docs Preview Panel
          '& .sbdocs-preview': {
            backgroundColor: 'transparent',

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

          // The table with properties
          '& .docblock-argstable': {
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
        },
      }}
    />
  ) : null
}
