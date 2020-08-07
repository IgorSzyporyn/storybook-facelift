import { withFaceliftPreview } from '../dist/decorators/withFaceliftPreview'
import { orange, blue, purple, cyan, red, pink } from '@material-ui/core/colors'

export const parameters = {
  '@badgers/facelift': {
    includeNative: true,
    defaultTheme: 'mui2',
    ui: {
      padding: '32px 32px',
    },
    /*
    docs: {
      type: 'simple',
      hidePropertyBorders: true,
    },
    */
    themes: [
      {
        key: 'mui1',
        title: 'Material UI - 1',
        type: 'mui',
        variants: {
          dark: {
            palette: {
              primary: {
                main: pink['A200'],
              },
              secondary: {
                main: blue['A200'],
              },
            },
          },
          light: {
            palette: {
              primary: {
                main: pink['500'],
              },
              secondary: {
                main: blue['500'],
              },
            },
          },
        },
      },
      {
        key: 'mui2',
        title: 'Material UI - 2',
        type: 'mui',
        variants: {
          light: {
            palette: {
              primary: {
                main: blue['500'],
              },
              secondary: {
                main: orange['500'],
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: blue['A200'],
              },
              secondary: {
                main: orange['A200'],
              },
            },
          },
        },
      },
      {
        key: 'mui3',
        title: 'Material UI - 3',
        type: 'mui',
        variants: {
          light: {
            palette: {
              primary: {
                main: orange['500'],
              },
              secondary: {
                main: purple['500'],
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: orange['A200'],
              },
              secondary: {
                main: purple['A200'],
              },
            },
          },
        },
      },
      {
        key: 'mui4',
        title: 'Material UI - 4',
        type: 'mui',
        previewOnly: true,
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
        key: 'mui5',
        title: 'Material UI - 5 - Reverse background, dark only',
        type: 'mui',
        background: 'reverse',
        variants: {
          dark: {
            palette: {
              primary: {
                main: orange['A200'],
              },
              secondary: {
                main: purple['A200'],
              },
            },
          },
        },
      },
    ],
  },
}

export const decorators = [withFaceliftPreview]
