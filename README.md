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

Easily unlock more control over Storybook such as control which columns to show in the Docs section (description, defaults and control) and more.

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

The addon and options available are meant to be as gracefull and unobtrusive as possible, and therefore most features of `storybook-facelift` are not enabled as default.

To get the most of the addon you may want to configure it through the options in `preview.js`.

```js
export const parameters = {
  facelift: {
    enhanceUi: true,
  },
}
```

Which will produce an UI wise enhanced version of Storybook with a dark/light toggler.

## Options

The type for the options is called `Parameters.ApiParameters`

```
enhanceUi?: boolean
includeNative?: boolean
autoThemeStory?: boolean
defaultTheme?: string
defaultVariant?: Parameters.ThemeVariantTypes
native?: Parameters.Native
override?: Parameters.StorybookThemeOverride
ui?: Parameters.UI
docs?: Parameters.Docs
themes?: Parameters.Theme[]
stories?: boolean | Parameters.Story[]
themeConverters?: Parameters.ThemeConverters
```

### Options API

### **enhanceUi** | `boolean` | default: `false`

- Fix a lot of minor CSS errors
- Ensure UI contrast ratio (mostly text and with approximation towards Storybooks initial intent - _text for selected stories in menu have a lower tolerance for contrast ratio than 4.5 (will in fact allow > 2.62) to try to keep it white as intended by Storybook for instance)_.
- Pimp up some UI elements such as menu icons, buttons for for panels, overlay menus etc..

### **defaultTheme** | `string` | default: `undefined`

- Which theme to select as default
- if `undefined` then first available theme in **themes** option will be selected - note that if no themes are provided, then native theme is automatically enabled and selected.

### **defaultVariant** | `"light" | "dark"` | default: `"light"`

- Variant of default theme to use - if not set will then `light` variant will be chosen _unless browser is in `dark` mode_.

### **includeNative** | `boolean` | default: `false`

- Instruct the addon to include the native theme even if custom themes are provided
- Note that this setting is auto enabled if no themes are provided.

### **themeConverters** | `Parameters.ThemeConverters` | default: `false`

- Key value configuration of converters used in converting theme types into Storybook themes.
- Note that the keys `"native"` and `"mui"` are protected.

### **autoThemeStory** | `boolean` | default: `false`

- Set to `true` to automatically theme any component in a story of same type as the theme used.
- Note that this feature only works for `"mui"` typed themes.

### **override** | `Parameters.StorybookThemeOverride` | default: `undefined`

- Easy way to set the title, logo or url for the whole application.
- Note that these settings can be overriden in turn by themes.

  > #### **brandTitle** | `string`
  >
  > - Set title of storybook globally.
  >
  > #### **brandImage** | `string`
  >
  > - Set logo of storybook globally.
  >
  > #### **brandUrl** | `string`
  >
  > - Set url of title or logo of storybook globally.

### **native** | `Parameters.Native` | default: `undefined`

- Configure the native theme if included.

  > #### **title** | `string`
  >
  > - Name to display in theme picker menu
  > - If no value set, then "Native Theme" is used.
  >
  > #### **variants** | `Array<"light" | "dark">`
  >
  > - Array with either `"light"` or `"dark"` (or both - but that equals to omission) to select specifically which variants to load for native theme.
  > - If no value set, then both are selected.
  >
  > #### **background** | `"normal" | "reverse" | "equal" | "equal-reverse"`
  >
  > - Allows you to choose how to apply the theme colors for app (appBg) and content (appContentBg) in theme.
  > - Applying `"reverse"` will use content background color on app, and app background color on content.
  > - Applying `"equal"` will use app background color both places, and `"equal-reverse"` will use content background color both places.
  > - If no value is set, then `"normal"` will be used.
  >
  > #### **override** | types: `Parameters.StorybookThemeOverride`
  >
  > - Set the title, logo or url for the native theme only.
  > - See [Parameters.StorybookThemeOverride]() for properties

### **ui** | `Parameters.UI` | default: `{ elevation: 2 }`

- Configure UI based settings
- Note that this requires `enhanceUi` to be set to `true`

  > #### **elevation** | `0 | 1 | 2 | 3`
  >
  > - Set the elevation level of the content panel - 0 is no elevation at all.
  >
  > #### **shadow** | `string`
  >
  > - Should you wish to provide your own shadow for the content panel, then add a valid `box-shadow` value here.
  >
  > #### **padding** | `string`
  >
  > - Provide a valid css string for `padding` and you can set the padding used in the Canvas panel.

### **docs** | `Parameters.Docs` | default: `{ type: "full" }`

- Configure settings for use in the Docs panel

  > #### **type** | `"full" | "simple"`
  >
  > - Setting this property to `"simple"` will remove all other elements in Docs panel apart from the documentation of properties.
  >
  > #### **hideStories** | `boolean`
  >
  > - If set to `true` then sibling stories shown below property table will be hidden.
  >
  > #### **hidePropertyBorders** | `boolean`
  >
  > - If set to `true` then borders between properties in documentation panel will be hidden.
  >
  > #### **hideDescription** | `boolean`
  >
  > - If set to `true` then description column in documentation panel will be hidden.
  >
  > #### **hideDefaults** | `boolean`
  >
  > - If set to `true` then defaults column in documentation panel will be hidden.

### **themes** | `Array<Parameters.Theme>` | default: `undefined`

- Provide an array of theme configuration objects to be used as themes for Storybook.

  > #### **key** | `string`
  >
  > - Note this value is **_required_**.
  > - Unique key to identify this theme configuration.
  >
  > #### **type** | `"native" | "mui" | "?"`
  >
  > - Note this value is **_required_**.
  > - Used to indentify the converter to use in order to compile a Storybook theme.
  > - Only `"native"` and `"mui"` are supported by the addon, so if you wish to use a custom made type, you have to ensure that a corresponding converter function is added in **themeConverters** - and ensure that the `"type"` value is used as the key of the converter function.
  >
  > #### **title** | `string`
  >
  > - Note this value is **_required_**.
  > - The name to show in the theme menu picker.
  >
  > #### **previewOnly** | `boolean`
  >
  > - If set to `true`, this theme will not be added to the list of themes shown in the theme picker menu.
  >
  > #### **background** | `"normal" | "reverse" | "equal" | "equal-reverse"`
  >
  > - Allows you to choose how to apply the theme colors for app (appBg) and content (appContentBg) in theme.
  > - Applying `"reverse"` will use content background color on app, and app background color on content.
  > - Applying `"equal"` will use app background color both places, and `"equal-reverse"` will use content background color both places.
  > - If no value is set, then `"normal"` will be used.
  >
  > #### **override** | types: `Parameters.StorybookThemeOverride`
  >
  > - Set the title, logo or url for this theme only.
  > - See [Parameters.StorybookThemeOverride]() for properties.
  >
  > #### **responsiveFontSizes** | types: `boolean`
  >
  > - Set if this theme should be using responsive font sizes from Material UI
  > - Note: This naturally ONLY works with a "mui" type theme
  >
  > #### **variants** | `ThemeVariants`
  >
  > - Note this value is **_required_**.
  > - Contains a `light` and/or a `dark` property with the theme options configuration for each.
  > - Note that in order for a theme configuration that is **_not_** either a, native storybook options object, or a Material UI options object to work; **themeConverters** must have a converter function with the same key as **type**
  >
  > Example of a mui based theme variants property value
  >
  > ```js
  > variants: {
  >   light: {
  >     palette: {
  >       primary: '#ff0000'
  >     }
  >   }
  > }
  > ```
  >
  > This would be a valid `variants` config object, but so would this...
  >
  > ```js
  > variants: {
  >   light: {
  >   }
  > }
  > ```
