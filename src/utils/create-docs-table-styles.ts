import { lighten } from '@material-ui/core'
import { Theme as StorybookTheme } from '@storybook/theming'
import { elevationMap } from '../styles/elevation'
import { Parameters } from '../typings'
import { createButtonStyles } from './create-button-styles'
import { createInputStyles } from './create-input-styles'
import { createPreviewColors } from './create-preview-colors'

type CreateDocsTableStylesOptions = {
  docs: Parameters.Docs
  isDark: boolean
}

export function createDocsTableStyles(theme: StorybookTheme, { docs, isDark }: CreateDocsTableStylesOptions) {

  const docsTableHead = `& .docblock-argstable-head`
  const docsTableBody = `& .docblock-argstable-body`
  const docsTableBodyRow = `${docsTableBody} tr`
  const docsTableBodyRowCell = `${docsTableBody} td`
  const docsTableBodyRowCellTitle = `${docsTableBodyRowCell}:first-of-type`
  const docsTableBodyRowCellDescription = `${docsTableBodyRowCell}:nth-of-type(2)`
  const docsTableBodyRowCellDefault = `${docsTableBodyRowCell}:nth-of-type(3)`
  const docsTableBodyRowCellControl = `${docsTableBodyRowCell}:nth-of-type(4)`

  const docsTablePaddingOuter = 20
  const docsTablePaddingInner = 15

  const docsTableBodyRowInputHeight = 32
  const docsTableBodyRowHeight = 64

  const inputStyles = createInputStyles(theme)
  const buttonStylesMinimal = createButtonStyles(theme, true)

  const styles: Record<string, any> = {}

  const colors = createPreviewColors(theme, { docs, isDark })
  const { color, background, border } = colors

  styles[`${docsTableHead}`] = {
    '& tr th': {
      color: color.docsLight,

      '&:first-of-type': {
        width: 'auto',
        minWidth: '160px',
        paddingLeft: docsTablePaddingOuter,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(2)': {
        width: 'auto',
        display: docs.hideDescription ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(3)': {
        width: 'auto',
        display: docs.hideDefaults ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,

        '&:last-of-type': {
          paddingRight: docsTablePaddingOuter,
        },
      },
      '&:nth-of-type(4)': {
        width: 'auto',
        minWidth: '251px',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingOuter,
      },
    },

    '& button': {
      ...buttonStylesMinimal,      
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
        display: docs.hideDescription ? 'none' : 'table-cell',
        paddingLeft: docsTablePaddingInner,
        paddingRight: docsTablePaddingInner,
      },
      '&:nth-of-type(3)': {
        width: 'auto',
        display: docs.hideDefaults ? 'none' : 'table-cell',
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
      marginTop: '4px',
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
      minWidth: '251px',
    },
    '& select': {
      ...inputStyles,
      width: 'calc(100% - 40px)',
      paddingRight: '30px',
    },
    '& > button': {
      ...inputStyles,
      boxSizing: 'border-box',
      lineHeight: '20px',

      '& > div': {
        boxShadow: `${border.color} 0 0 0 1px inset`
      }
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


  return styles
}