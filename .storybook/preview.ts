import { theme as appTheme } from '../theme/theme'
import { withFaceliftPreview } from '../dist/decorators/withFaceliftPreview'
import { orange, blue, purple, cyan, red } from '@material-ui/core/colors'

export const parameters = {
  '@badgers/facelift': {
    includeNative: true,
    defaultTheme: 'mui5',
    main: {
      padding: '32px 24px',
    },
    themes: [
      {
        key: 'mui1',
        title: 'App Theme (Material UI)',
        type: 'mui',
        override: {
          brandTitle: 'mui 1',
        },
        variants: {
          dark: appTheme.dark,
        },
      },
      {
        key: 'mui2',
        title: 'Light & Dark with titles',
        type: 'mui',
        override: {
          brandTitle: 'mui 2',
        },
        variants: {
          light: appTheme.light,
          dark: {
            theme: appTheme.dark,
            override: {
              brandTitle: 'mui 2 - Dark',
            },
          },
        },
      },
      {
        key: 'mui3',
        title: 'From Options',
        type: 'mui-options',
        variants: {
          dark: {
            palette: {
              type: 'dark',
              primary: {
                main: red['A200'],
              },
              secondary: {
                main: cyan['A200'],
              },
              background: {
                paper: '#8b8b8b',
              },
            },
          },
        },
      },

      {
        key: 'mui4',
        title: 'From Options',
        type: 'mui-options',
        variants: {
          dark: {
            palette: {
              primary: {
                main: purple['A200'],
              },
              secondary: {
                main: orange['A200'],
              },
            },
          },
        },
      },
      {
        key: 'mui5',
        title: 'From Options',
        type: 'mui-options',
        variants: {
          light: {
            palette: {
              primary: {
                main: orange['500'],
              },
              secondary: {
                main: blue['500'],
              },
            },
          },
        },
      },
    ],
  },
}

export const decorators = [withFaceliftPreview]
