<div>
  <p align="center">
    <img src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/logo-large.png" />
  </p>
</div>

### Multiple themes integration with light/dark mode and Theme Providers for stories

- [Installation](#installation)
- [Usage](#usage)
- [Configure Addon](#usage-configure-addon)
- [Configure Story](#usage-configure-story)
- [Parameters](#parameters)
- [Addon Parameters](#parameters-addon)
- [Story Parameters](#parameters-story)
- [Examples](#examples)

### Introduction

- Multiple themes support with light/dark mode (just provide options object) for
  - [Storybook Theming](https://storybook.js.org/docs/react/configure/theming)
  - [Material UI Theming](https://material-ui.com/customization/theming/)
  - Custom themes (custom theme converter required)
- Embedded support for
  - [Material UI Theme Provider](https://material-ui.com/customization/theming/#theme-provider)
  - [Styled Components Theme Provider](https://styled-components.com/docs/advanced) (custom themes via `styled` type)

#### Easy to use

Storybook Facelift is zero-config - which will just return a light/dark mode button for the native theme

#### Customize Storybook features

Easily unlock more control over Storybook such as control which columns to show with [@storybook/addon-docs](https://www.npmjs.com/package/@storybook/addon-docs) (description, defaults and control) and more.

#### Enhanced UI for Storybook

Unlock better UI for Storybook via the parameter `enhanceUi`

Most notably dark mode works for [@storybook/addon-docs](https://www.npmjs.com/package/@storybook/addon-docs)

Later versions of Storybook does not require much changes to the CSS and this part will probably be deprecated

#### Automatic Theme Providers with Material UI and Styled Components

Use the parameter `autoThemeStory` to automatically add a React Theme Provider for your stories

- Material UI themes uses own provider
- Badger UI themes uses Styled Components
- Custom themes uses Styled Components via custom theme converter

Provide a custom theme converter named `styled` under the parameter `themeConverters`, and use same type for your custom theme to use Styled Components

```
{
  themeConverters: {
    styled: () => ...
  },
  themes: [
    {
      type: 'styled',
      ...
    }
  ]
}
```

## <a name="installation"></a>Installation

`npm i -D storybook-facelift`

## <a name="usage"></a>Usage

## <a name="#usage-configure-addon"></a>Configure Addon

Add the addon to your storybook `main.js` file (or `main.ts` - will just assume js from now on...)

```js
module.exports = {
  ...
  addons: [
    ...
    'storybook-facelift'
  ]
}
```

This will give you the zero-config version of the addon which is simply Storybook as-is, but with a light/dark theme variant toggler.

The addon and parameters available are meant to be as gracefull and unobtrusive as possible, and therefore most features of `storybook-facelift` are not enabled as default.

To get the most of the addon you may want to configure it through the parameters in `preview.js`.

```js
export const parameters = {
  facelift: {
    enhanceUi: true,
  },
}
```

Which will produce an UI wise enhanced version of Storybook with a dark/light toggler.

### TypeScript support example

```ts
import type { Parameters as StorybookParameters } from '@storybook/react'
import type { AddonParameters as StorybookFaceliftParameters } from 'storybook-facelift'

type Parameters = {
  facelift: StorybookFaceliftParameters
} & StorybookParameters

export const parameters: Parameters = {
  facelift: {
    enhanceUi: true,
  },
}
```

## <a name="#usage-configure-story"></a>Configure Story

You can also configure Storybook Facelift on story level to enable auto theming with a theme provider on a story level instead of on a global level

```js
import React from 'react'
import { Tag } from './Tag'

export default {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    facelift: {
      autoThemeStory: true,
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

As `Meta` from `@storybook/react` can not have `Parameters` augmented Storybook Facelift provides a `StoryMeta` type

This type will let you add additional parameter types from other addons as a generic, and also the `Args` generic that `Meta` takes

- Link to referenced [ParamDocs](#param-story-docs)
- Link to referenced [StorybookThemeOptionsOverride](#support-type-storybook-theme-options-override)

```ts
import { Meta, Parameters } from '@storybook/react'
import { Args as DefaultArgs } from '@storybook/addons'

type StoryParameters = {
  autoThemeStory?: boolean
  docs?: ParamDocs
  enhanceUi?: boolean
  ui?: ParamUi
  override?: StorybookThemeOptionsOverride
}

type StoryMeta<
  T extends Record<string, unknown> = Record<string, unknown>,
  ArgTypes = DefaultArgs
> = Meta<ArgTypes> & {
  parameters?: Parameters & {
    facelift: StoryParameters
  } & T
}
```

```ts
import { StoryMeta } from 'storybook-facelift'
```

```ts
import React from 'react'
import { Tag } from './Tag'

import type { Story } from '@storybook/react'
import type { StoryMeta } from 'storybook-facelift'
import type { TagProps } from './Tag'

export default {
  title: 'UI/Tag',
  component: Tag,
  parameters: {
    facelift: {
      autoThemeStory: true,
    },
  },
} as StoryMeta

const Template: Story<TagProps> = (args) => <Tag {...args} />

export const Controllable = Template.bind({})
Controllable.args = {
  label: 'Tag',
}
```

## <a name="parameters"></a>Parameters

### <a name="parameters-addon"></a>Addon Parameters

```ts
  "autoThemeStory"?: boolean
  "defaultTheme"?: string
  "defaultVariant"?: ThemeVariantTypes
  "docs"?: ParamDocs
  "enhanceUi"?: boolean
  "includeNative"?: boolean
  "native"?: ParamNative
  "override"?: ThemeOptionsOverride
  "themeConverters"?: ParamThemeConverters
  "themes"?: ParamTheme[]
  "ui"?: ParamUi
```

#### autoThemeStory `boolean`

##### Addon parameter

Globally enable the WithTheme decorator for all themes using the original framework theme as context in theme provider.

This will wrap your story in a Theme Provider for the theme you are using (MUI or Styled Components)

#### defaultTheme `string`

##### Addon parameter

The default theme to start storybook with - the key from the theme parameter is used as reference

#### docs `ParamDocs`

##### Addon parameter

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

#### defaultVariant `ThemeVariantTypes ('light' | 'dark')`

##### Addon parameter

The default theme variant for Storybook theme

#### enhanceUi `boolean`

##### Addon parameter

Fix some minor css errors, ensure contrast ratios in text (themes can have weird colors), and allow usage of the `ui` parameter

#### includeNative `boolean`

##### Addon parameter

If custom themes are provided then set this parameter to true in order to include the native Storybook theme

#### override `StorybookThemeOptionsOverride`

##### Addon parameter

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

##### Addon parameter

Easy simple courtesy parameters for the most used features to tweak for the native theme, as well as full control via `override`

- link to the referenced type [StorybookThemeOptionsOverride](#support-type-storybook-theme-options-override)

```ts
  // Title to show in the menu picker
  "title"?: string

  // Control which theme variants are available - defaults to ["light", "dark"]
  "variants"?: ("light" | "dark")[]

  // Control the usage of Storybooks theme values in the backgrounds
  "background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"

  // Override any default native theme options from Storybook
  "override"?: StorybookThemeOptionsOverride
```

#### themeConverters `Record<string, ParamThemeConverter>`

##### Addon parameter

Match property named functions mapping the `type` property values from `ParamTheme` to use custom themes

Please note that the keys `native` & `mui` should be reserved for Storybook Facelift, but can be so you can provide your own converters for Material UI and themes for type `styled` (should you want Styled Components theme provider for your stories)

If a converter named `styled` is provided, then the use of `type: "styled"` for custom themes will be supported with a theme context provider from Styled Componentes if `autoThemeStory` is enabled

Go to [examples](#examples) to see how to implement a custom theme

- link to the referenced type [StorybookThemeOptions](#support-type-storybook-theme-options)
- link to the referenced type [StorybookThemeOptionsOverride](#support-type-storybook-theme-options-override)
- link to the referenced type [StorybookFaceliftThemeOptions](#support-type-storybook-facelift-theme-options)
- link to the referenced type [StorybookFaceliftTheme](#support-type-storybook-facelift-theme)

```ts
  [key]: (props: {
    "override"?: StorybookThemeOptionsOverride
    "theme": StorybookFaceliftThemeOptions
    "variant": "light" | "dark"
    "background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"
    "responsiveFontSizes"?: boolean
  }) => null | {
    "storybookThemeOptions": StorybookThemeOptions
    "themeOptions": StorybookFaceliftThemeOptions
    "theme": StorybookFaceliftTheme
  }
```

#### themes `ParamTheme[]`

##### Addon parameter

- link to the referenced type [StorybookThemeOptionsOverride](#support-type-storybook-theme-options-override)
- link to the referenced type [StorybookFaceliftThemeOptions](#support-type-storybook-facelift-theme-options)

```ts
  // Unique key for this theme entry
  "key": string

  // Built in support for Storybook native theme, Material UI, Styled Components (through custom converter
  // with same name) and any other string that is matched by a function key in the themeConverter parameter
  "type": "native" | "mui" | "styled" | string

  // The title used in the theme picker
  "title": string

  // These are the theme options for light and/or dark mode.
  "variants": {
    "light"?: StorybookFaceliftThemeOptions
    "dark"?: StorybookFaceliftThemeOptions
  }

  // Override any Storybook theme options value for this theme
  "override"?: StorybookThemeOptionsOverride

  // Ability to configure how backgrounds are used in the Storybook theme
  // 'reverse' will swap between app and content etc..
  "background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"

  // This theme is for the toolbox preview mode only and will make the theme not show in theme picker
  // Note: Only supported for Material UI themes for now
  "previewOnly"?: boolean

  // This is for typography - use responsive font sizes or not
  "resposiveFontSizes"?: boolean
```

#### ui `ParamUi`

##### Addon parameter

```ts
  // How much to elevate the content panel
  elevation?: 0 | 1 | 2 | 3 | 4

  // Ability to override SB's own preview panel padding
  padding?: string

  // Ability to use a custom css box-shadow string for content elevation
  shadow?: string
```

### <a name="parameters-story"></a>Story Parameters

```ts
  "autoThemeStory"?: boolean
  "docs"?: ParamDocs
  "enhanceUi"?: boolean
  "ui"?: ParamUi
  "override"?: StorybookThemeOptionsOverride
```

#### autoThemeStory `boolean`

##### Story parameter

Enable the WithTheme decorator for this story

This will wrap your story in a Theme Provider for the theme you are using (MUI or Styled Components)

#### docs `ParamDocs`

##### Story parameter

Enhanced docs control for this story

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

##### Story parameter

Fix some minor css errors, ensure contrast ratios in text (themes can have weird colors), and allow usage of the `ui` parameter

#### ui `ParamUi`

##### Story parameter

```ts
  // How much to elevate the content panel
  elevation?: 0 | 1 | 2 | 3 | 4

  // Ability to override SB's own preview panel padding
  padding?: string

  // Ability to use a custom css box-shadow string for content elevation
  shadow?: string
```

#### override `StorybookThemeOptionsOverride`

##### Story parameter

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

## <a name="support-types"></a>Support Types

#### <a name="support-type-storybook-theme-options"></a>StorybookThemeOptions

```ts
  "base": string
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

#### <a name="support-type-storybook-theme-options-override"></a>StorybookThemeOptionsOverride

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

#### <a name="support-type-storybook-facelift-theme-options"></a>StorybookFaceliftThemeOptions

Configuration object for either Storybook, Material UI or a custom theme depending on the `type` property set for the theme

```ts
import type { StorybookFaceliftThemeOptions } from 'storybook-facelift'
```

##### With theme type "native" (Storybook)

For native Storybook themes the config type is almost the same as that of Storybooks own `ThemeVars`

However it does not have the required `base` property `ThemeVars` has since themes in storybook-facelift is bound on light or dark keys, and should be able to support zero-config with defaults

- link to [Storybook theming documentation](https://storybook.js.org/docs/react/configure/theming)

```ts
  "colorPrimary"?: string     // primary color for theme
  "colorSecondary"?: string   // used for buttons, menu item backgrounds etc..
  "appBg"?: string            // main background color of body
  "appContentBg"?: string     //
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

##### With theme type "mui" (Material UI)

For Material UI themes the theme config is the same as that of MUIs own `ThemeOptions`

- link to [MUI createMuiTheme options documentation](https://material-ui.com/customization/theming/#createmuitheme-options-args-theme)
- link to [ThemeOptions on GitHub](https://github.com/mui-org/material-ui/blob/79242159a5156d11db4ce3a024e2eb07bd953b49/packages/material-ui/src/styles/createTheme.d.ts#L16)

#### <a name="support-type-storybook-facelift-theme"></a>StorybookFaceliftTheme

##### With theme type "native" (Storybook)

The fully initialized and created instance of the Storybook theme from the given Storybook theme options

- Link to [Theme on GitHub](https://github.com/storybookjs/storybook/blob/d250308e41f72ee5792533fe4d04ed31b820741c/lib/theming/src/types.ts#L57)

##### With theme type "mui" (Material UI)

The fully initialized and created instance of the Material UI theme from the given Material UI theme options

- Link to [Theme on Github](https://github.com/mui-org/material-ui/blob/79242159a5156d11db4ce3a024e2eb07bd953b49/packages/material-ui/src/styles/createTheme.d.ts#L31)

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

Will also enhance the UI and add WithFacelift decorator to apply theme to stories

```ts
export const parameters = {
  facelift: {
    enhanceUi: true,
    autoThemeStory: true,
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

Will also enhance the UI and add WithFacelift decorator to apply theme to stories

```ts
export const parameters = {
  facelift: {
    enhanceUi: true,
    autoThemeStory: true,
    themeConverters: {
      styled: ({ theme, variant }) => ({
        storybookThemeOptions: {
          base: variant,
          colorPrimary: theme.primary,
          colorSecondary: theme.secondary,
        },
        themeOptions: theme,
        theme: theme,
      }),
    },
    themes: [
      {
        type: 'styled',
        key: 'custom-1',
        title: 'Custom UI theme',
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
