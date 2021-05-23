<div>
  <p align="center">
    <img src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/logo-large.png" />
  </p>
  <p align="center">
    <a href="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-1.png" target="_blank">
    <img width="128px" src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-1.png" />
    </a>
    <a href="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-2.png" target="_blank">
    <img width="128px" src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-2.png" />
    </a>
    <a href="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-3.png" target="_blank">
    <img width="128px" src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-3.png" />
    </a>
  </p>
  <p align="center">
    <a href="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-4.png" target="_blank">
    <img width="128px" src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-4.png" />
    </a>
    <a href="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-5.png" target="_blank">
    <img width="128px" src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-5.png" />
    </a>
    <a href="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-6.png" target="_blank">
    <img width="128px" src="https://raw.githubusercontent.com/IgorSzyporyn/storybook-facelift/master/assets/example-6.png" />
    </a>
  </p>
  <p>&nbsp;</p>
</div>

# Multiple themes integration with light/dark mode

Simply provide the options object for the preset theme framework you wish to implement (or your custom)

- [Material UI](https://material-ui.com/) Themes
- Native Storybook Themes
- Badger UI Themes
- Support for custom themes converters and [Styled Components](https://styled-components.com/)

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

## Installation

`npm i -D storybook-facelift`

## Usage

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
import type { Parameters as StorybookParameters } from '@storybook/react';
import type { AddonParameters as StorybookFaceliftParameters } from 'storybook-facelift';

type Parameters = {
  facelift: StorybookFaceliftParameters;
} & StorybookParameters;

export const parameters: Parameters = {
  facelift: {
    enhanceUi: true
  }
```

## Parameters

##### autoThemeStory `boolean`

Enable the WithTheme decorator for all themes using the original framework theme as context in theme provider.

##### defaultTheme `string`

The default theme to start storybook with - the key from the theme parameter is used as reference

##### docs `ParamDocs`

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

##### defaultVariant `ThemeVariantTypes ('light' | 'dark')`

The default theme variant for Storybook theme

##### enhanceUi `boolean`

Fix some minor css errors, ensure contrast ratios in text (themes can have weird colors), and allow usage of the `ui` parameter

##### includeNative `boolean`

If custom themes are provided then set this parameter to true in order to include the native Storybook theme

##### native `ParamNative`

```ts
  // Control the usage of Storybooks theme values in the backgrounds
  "background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"

  // Override any default native theme options from Storybook
  "override"?: ParamThemeOverride

  // Title to show in the menu picker
  "title"?: string

  // Control which theme variants are available - defaults to ["light", "dark"]
  "variants"?: ("light" | "dark")[]
```

##### override `ParamOverride`

Storybook wide

```ts
  // Customize the title for Storybook
  "brandTitle"?: string

  // Customize a URL and title will link to it
  "brandUrl"?: string

  // Customize the brand image - will accept base64 encoded images
  "brandImage"?: string
```

##### themeConverters `Record<string, ParamThemeConverter>`

Match property named functions mapping the `type` property values from `ParamTheme` to use custom themes

Please note that the keys `native`, `mui` & `cylindo` should be reserved for Storybook Facelift, but can be so you can provide your own converters for Material UI and Cylindo Ui

If a converter named `styled` is provided, then the use of `type: "styled"` for custom themes will be supported with a theme context provider from Styled Componentes if `autoThemeStory` is enabled

Click here for more information about how to create custom theme converters

```ts
  [key]: (props: ThemeConverterFnProps) => null | ThemeConverterFnResult
```

##### themes `ParamTheme[]`

```ts
  // Unique key for this theme entry
  "key": string

  // Built in support for Storybook native theme, Material UI, BadgerUi,
  // Styled Components (through custom converter with same name) and any other string that is matched
  // by a converter function key in themeConverter parameter
  "type": "native" | "mui" | "styled" | string

  // Override the Storybook theme used with these settings
  // Good for special brandTitle etc..
  "override"?: ParamThemeOverride

  // The title used in the theme picker
  "title": string

  // Ability to configure how backgrounds are used in the Storybook theme
  // 'reverse' will swap between app and content etc..
  "background"?: "normal" | "reverse" | "equal" | "equal-reverse" | "equal-app" | "equal-content"

  // Variants config with a "light" or "dark" property - these are the theme options which will be
  // used for the theme in each chosen variant.
  "variants": ThemeVariants

  // This theme is for the toolbox preview mode only and will make the theme not show in theme picker
  // Note: Only supported for Material UI themes for now
  "previewOnly"?: boolean

  // This is for typography - use responsive font sizes or not
  "resposiveFontSizes"?: boolean
```

## Examples

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
