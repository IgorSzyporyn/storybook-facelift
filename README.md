<div>
  <p align="center">
    <img src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/logo-large.png" />
  </p>
</div>

# Themes, Theme Providers & true dark mode

- [Installation](#installation)
- [Configure Addon](#configure-addon)
- [Configure Story](#configure-story)
- [Parameters](#addon-parameters)
- [Examples](#examples)

Storybook Facelift is zero-config - which will just return a light/dark mode button for the native theme

But you can also

- Add themes that can theme Storybook using built-in theming suppport from
  - [Storybook theming](https://storybook.js.org/docs/react/configure/theming)
  - [Material UI theming](https://material-ui.com/customization/theming/)
  - Or provide a custom theme if you provide a theme converter
- Add themes that can decorate your components with built-in theme providers from
  - [Material UI](https://material-ui.com/customization/theming/#theme-provider)
  - [Styled Components](https://styled-components.com/docs/advanced)
  - [Emotion](https://emotion.sh/docs/theming#themeprovider-reactcomponenttype)
- True dark mode
- Unlock dark mode and column control for [@storybook/addon-docs](https://www.npmjs.com/package/@storybook/addon-docs) and more UI controls

## <a name="installation"></a>Installation

`npm i -D storybook-facelift`

## <a name="configure-addon"></a>Configure Addon

Add the addon to your storybook `main.js` file (or `main.ts` - will just assume js from now on...)

```js
module.exports = {
  addons: ['storybook-facelift'],
}
```

To get the most of the addon you may want to configure it through the parameters in `preview.js`.

```js
export const parameters = {
  facelift: {...},
}
```

#### TypeScript support example

Storybook Facelift supplies a custom `Parameters` type to help you get typesafety in your parameters.

It takes one generic to let you add more parameter types from other addons and retain Storybook parameter typesafety

```ts
import type { Parameters } from 'storybook-facelift'
import type { OtherAddonParam } from 'other-addon'

export const parameters: Parameters<{
  otherAddon: OtherAddonParam,
}> = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  otherAddon: {...},
  facelift: {...},
}
```

## <a name="configure-story"></a>Configure Story

You can also configure Storybook Facelift on story level, for instance to enable auto theming with a theme provider on a story level instead of on a global level, and maybe even add a special theme provider for this story

```js
import React from 'react'
import { Tag } from './Tag'

export default {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    facelift: {
      addProvider: true,
      provider: 'styled',
      providerTheme: 'theme-1',
    },
  },
}

const Template = (args) => <Tag {...args} />

export const Controllable = Template.bind({})
Controllable.args = {
  label: 'Tag',
}
```

### TypeScript support example

Storybook Facelift supplies a custom Meta type to help you get typesafety in your story parameters.

This type takes 2 generic arguments, the additional parameter types and Storybooks own `Args` (sadly you have to provide an empty object as first generic if you wish to apply an `Args` generic and have no additional addon parameter types to provide)

```ts
import React from 'react'
import { Tag } from './Tag'

import type { Story } from '@storybook/react'
import type { Meta } from 'storybook-facelift'
import type { TagProps } from './Tag'
import type { OtherAddonParam } from 'other-addon'

export default {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    otherAddon: {...},
    facelift: {...},
  },
} as Meta<{otherAddon: OtherAddonParam}>

const Template: Story<TagProps> = (args) => <Tag {...args} />

export const Controllable = Template.bind({})
Controllable.args = {
  label: 'Tag',
}
```

## <a name="addon-parameters"></a>Addon Parameters

```ts
"addProvider"?: boolean
"autoThemeStory"?: boolean // deprecated - use addProvider
"defaultTheme"?: string
"defaultVariant"?: "light" | "dark"
"docs"?: ParamDocs
"enhanceUi"?: boolean
"includeNative"?: boolean
"native"?: ParamNative
"override"?: ThemeOptionsOverride
"provider"?: "mui" | "styled" | "emotion"
"providerTheme"?: string
"themeConverters"?: Record<string, ThemeConverterFn>
"themes"?: ParamTheme[]
"ui"?: ParamUi
```

#### addProvider `boolean`

Enable theme provider either globally or on story level

#### defaultTheme `string`

The default theme to start storybook with - the key from the theme parameter is used as reference

#### defaultVariant `"light" | "dark"`

The default theme variant to use for your Storybook theme

#### docs `ParamDocs`

Enhanced Docs control

```ts
// Set to true to hide the column borders in docs table
"hidePropertyBorders"?: boolean

// Set to true to hide description column in docs table
"hideDescription"?: boolean

// Set to true to hide default value column in docs table
"hideDefaults"?: boolean

// Set to true to hide the controls column in docs
"hideControls"?: boolean

// Set to true to hide the sibling stories shown below property table
"hideStories"?: boolean

// Set to either full or simple - full is default, and simple will ONLY show docs table
"type"?: "full" | "simple"
```

#### enhanceUi `boolean`

Fix some minor css errors, and allow usage of the `ui` parameter

#### includeNative `boolean`

If custom themes are provided then set this parameter to `true` in order to include the native Storybook theme

#### override `ThemeOptionsOverride`

Storybook theme options object that will extend itself on to the default Storybook theme options used as defaults for all theme creation

Any value added here will be in the final theme output, unless value is overwritten later (typically all are apart from `brandTitle`, `brandUrl` & `brandImage`)

```ts
"colorPrimary"?: string
"colorSecondary"?: string
"appBg"?: string
"appContentBg"?: string
"appBorderColor"?: string
"appBorderRadius"?: number
"fontBase"?: string
"fontCode"?: string
"textColor"?: string
"textInverseColor"?: string
"textMutedColor"?: string
"barTextColor"?: string
"barSelectedColor"?: string
"barBg"?: string
"inputBg"?: string
"inputBorder"?: string
"inputTextColor"?: string
"inputBorderRadius"?: number
"brandTitle"?: string
"brandUrl"?: string
"brandImage"?: string
"gridCellSize"?: number
```

#### native `ParamNative`

Easy simple courtesy parameters to tweak the native theme, as well as full control via `override`

```ts
// Title to show in the menu picker
"title"?: string

// Control which theme variants are available - defaults to ["light", "dark"]
"variants"?: ("light" | "dark")[]

// Control the usage of Storybooks theme values in the backgrounds
"background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"

// Override any default native theme options from Storybook
"override"?: ThemeOptionsOverride
```

#### themeConverters `Record<string, ThemeConverterFn>`

Provide custom converter functions to convert your custom themes into Storybook themes

The key of the function will make the converter accessible to themes via the `converter` option for themes

Go to [examples](#examples) to see how to implement a custom theme

```ts
[key]: (props: {
  "override"?: ThemeOptionsOverride
  "theme": ThemeOptions
  "variant": "light" | "dark"
  "background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"
  "responsiveFontSizes"?: boolean
}) => {
  "storybook": StorybookThemeOptions
  "instanciated": ThemeInstanciated
  "options": ThemeOptions
} | null
```

#### themes `ParamTheme[]`

The theme configuration

```ts
// Unique key for this theme entry
"key": string

// Use the built in support of Storybook or Material UI
// Or indicate you are providing a custom theme
"type": "native" | "mui" | "custom"

// The title used in the theme picker
"title": string

// The name of the converter function to use - if the theme type
// is "mui" or "native" you do not need to set this
"converter"?: string

// The theme provider to use for this theme if "addProvider" for story is true
"provider"?: "mui" | "styled" | "emotion"

// The key of the theme to use for the theme provider if "addProvider" is true
"providerTheme"?: string

// Indicate that this theme is only to be used for theme providers - not to theme Storybook
"providerOnly"?: boolean


// These are the theme options for light and/or dark mode.
"variants": {
  "light"?: ThemeOptions
  "dark"?: ThemeOptions
}

// Override any Storybook theme options value for this theme
"override"?: ThemeOptionsOverride

// Ability to configure how backgrounds are used in the Storybook theme
// 'reverse' will swap between app and content etc..
"background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"

// This is for typography - use responsive font sizes or not (only MUI support)
"resposiveFontSizes"?: boolean
```

#### ui `ParamUi`

```ts
// How much to elevate the content panel
"elevation"?: 0 | 1 | 2 | 3 | 4

// Ability to override SB's own preview panel padding
"padding"?: string

// Ability to use a custom css box-shadow string for content elevation
"shadow"?: string
```

## <a name="examples"></a>Examples

#### Minimal native Storybook theme with light variant only

```ts
export const parameters = {
  facelift: {
    themes: [
      {
        key: 'native-1',
        type: 'native',
        title: 'Custom Storybook theme',
        variants: {
          light: {
            colorPrimary: '#0000ff',
          },
        },
      },
    ],
  },
}
```

#### Example w/default Material UI light & dark themes

Theme Storybook with default Material UI theme, and add a Material UI theme provider with same theme for all stories

```ts
export const parameters = {
  facelift: {
    addProvider: true,
    themes: [
      {
        type: 'mui',
        key: 'mui-1',
        title: 'Default Material UI theme',
        variants: {
          light: {},
          dark: {},
        },
      },
    ],
  },
}
```

#### Example w/custom light theme and Styled Components theme provider

This very minimal example will theme Storybook in a minimal custom theme, and add a Style Components theme provider to the stories

```ts
export const parameters = {
  facelift: {
    addProvider: true,
    themeConverters: {
      myCustomConverter: ({ theme, variant }) => ({
        storybook: {
          base: variant,
          colorPrimary: theme.primary,
          colorSecondary: theme.secondary,
        },
        options: theme,
        instanciated: theme,
      }),
    },
    themes: [
      {
        type: 'custom',
        key: 'custom-1',
        title: 'Custom UI theme',
        converter: 'myCustomConverter',
        provider: 'styled',
        variants: {
          light: {
            primary: '#ff0000',
            secondary: '#0000ff',
          },
        },
      },
    ],
  },
}
```
