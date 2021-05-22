import { lighten } from '@material-ui/core'
import { Theme as StorybookTheme } from '@storybook/theming'
import { elevationMap } from '../styles/elevation'
import { createInputStyles } from './create-input-styles'
import { createPreviewColors } from './create-preview-colors'

import type { ParamDocs } from '../types/parameters'

type CreateDocsTableStylesOptions = {
  params: ParamDocs
  isDark: boolean
  isToolPanel?: boolean
}

export function createDocsTableStyles(
  theme: StorybookTheme,
  { params, isDark, isToolPanel }: CreateDocsTableStylesOptions
) {
  const docsTableHead = `& .docblock-argstable-head`
  const docsTableBody = `& .docblock-argstable-body`
  const docsTableBodyRow = `${docsTableBody} tr`
  const docsTableBodyRowCell = `${docsTableBody} td`
  const docsTableBodyRowCellDescription = `${docsTableBodyRowCell}:nth-of-type(2)`
  const docsTableBodyRowCellDefault = `${docsTableBodyRowCell}:nth-of-type(3)`
  const docsTableBodyRowCellControl = `${docsTableBodyRowCell}:nth-of-type(${
    isToolPanel ? '2' : '4'
  })`

  const inputStyles = createInputStyles(theme)

  const styles: Record<string, any> = {}

  const colors = createPreviewColors(theme, { params, isDark })
  const { color, background, border } = colors

  let numberOfColumns = 4

  if (params.hideControls) {
    numberOfColumns -= 1
  }

  if (params.hideDefaults) {
    numberOfColumns -= 1
  }

  if (params.hideDescription) {
    numberOfColumns -= 1
  }

  styles[`${docsTableHead}`] = {
    '& tr th': {
      color: color.docsLight,
      '&:nth-of-type(2)': {
        display: !isToolPanel && params.hideDescription ? 'none' : 'table-cell',
      },
      '&:nth-of-type(3)': {
        display: !isToolPanel && params.hideDefaults ? 'none' : 'table-cell',
      },
      '&:nth-of-type(4)': {
        display: !isToolPanel && params.hideControls ? 'none' : 'table-cell',
      },
    },
  }

  styles[`${docsTableBody}`] = {
    color: color.docs,
    borderRadius: border.radius,
    boxShadow: isToolPanel ? 'none' : elevationMap[1],
  }

  // Fix border radius problems and set themes borderRadius
  styles[`${docsTableBodyRow}`] = {
    '& td': {
      padding: '20px',
      '&:nth-of-type(2)': {
        display: !isToolPanel && params.hideDescription ? 'none' : 'table-cell',
        width: numberOfColumns < 4 ? '50%' : 'auto',
      },
      '&:nth-of-type(3)': {
        display: !isToolPanel && params.hideDefaults ? 'none' : 'table-cell',
      },
      '&:nth-of-type(4)': {
        display: !isToolPanel && params.hideControls ? 'none' : 'table-cell',
      },
    },

    '&:not(:first-of-type)': { borderTopColor: border.color },
  }

  styles[`${docsTableBodyRowCell}`] = {
    color: color.docs,
    background: isToolPanel ? 'transparent' : background.docsTable,
  }

  styles[`${docsTableBodyRowCellDescription}`] = {
    color: color.docsTableLight,

    // Container for description text
    '& > div:not(:first-of-type)': {
      marginTop: '11px',
    },

    // Container for properties
    '& div + div': {
      marginTop: '11px',
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
    },

    '& code': {
      backgroundColor: background.docsTable,
      color: color.docsLight,
      borderColor: color.docsLight,
    },

    '& a': {
      color: theme.color.secondary,
      fontWeight: theme.typography.weight.bold,
    },
  }

  styles[`${docsTableBodyRowCellDefault}`] = {
    '& > div > span': {
      ...(isDark
        ? {
            backgroundColor: lighten(background.docs, 0.1),
            color: color.docsLight,
            borderColor: color.docsLight,
          }
        : {}),
    },
  }

  if (!isToolPanel) {
    styles[`${docsTableBodyRowCellControl}`] = {
      '& input': {
        ...inputStyles,
      },
      '& textarea': {
        ...inputStyles,
      },
      '& select': {
        ...inputStyles,
      },
      '& > button': {
        ...inputStyles,

        '& > div': {
          boxShadow: `${border.color} 0 0 0 1px inset`,
        },
      },
      '& > label': {
        '& input[type="checkbox"]': {
          background: 'transparent',
          borderRadius: '32px',
        },
        '& span': {
          color: color.docsLight,
        },
      },

      '& span > svg': {
        right: '10px',
      },
    }
  }

  return styles
}
