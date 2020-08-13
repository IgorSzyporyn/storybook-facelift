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
</div>

# Storybook Facelift 

**Theme integration and Enhanced UI for Storybook 6.0**

***NOTE:*** *Since this is first release, update often and PLEASE [submit issues](https://github.com/IgorSzyporyn/storybook-facelift/issues)*

At its core Storybook Facelift simply lets you easily add and select multiple themes for storybook - in either light or dark variants, or both.

Storybook Facelift also lets you easily integrate themes from other theming frameworks by either allowing theme converter functions in configuration, or by using the built in converters (currently only [Material UI](https://material-ui.com/) is supported).

Storybook Facelift also offers a wide variety of easy config options to control how Storybook behaves - note that in order to be able to control many of these features, the configuration option `enhanceUi` to be set.

With the `enhanceUi` option set you also get theme color contrast safety for readability no matter how much your theme clashes with Storybook's theming.

[@storybook/addon-docs](https://www.npmjs.com/package/@storybook/addon-docs) is also supported by `enhanceUi` and will theme according to your chosen theme and theme variant.

Apart from that Storybook Facelift also offers control over what is presented in the @storybook/addon-docs panel - with the option to hide all other elements than the property table, control the visibility state of "defaults" and "description" column in the property table - and if borders should be shown or not.

Storybook Facelift also supports Material UI, with the option `autoThemeStory` your story will automatically inherit the theme selected - if this theme is of the `mui` type.

## Installation

`npm i storybook-facelift`

## Usage

First add the addon to your storybook `main.js` file (or `main.ts` - will just assume js from now on...)

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

All options in `storybook-facelift` are optional - you can get away with a zero config (well... zero-options) initialization of the addon.

But to get the most of the addon you will more than likely want to add a few.

### The Options Type

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
