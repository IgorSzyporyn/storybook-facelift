# Storybook Facelift

**Enhanced UI and full theme integration for Storybook 6.0**

## Installation

`npm i @badgers/storybook-facelift`

## Usage

First add the addon to your storybook `main.js` file (or `main.ts` - will just assume js from now on...)

```js
module.exports = {
  ...
  addons: [
    ...
    '@badgers/storybook-facelift'
  ]
}
```

And then configure it in `preview.js`

```js
import { withFacelift } from '@badgers/storybook-facelift'

export const decorators = [withFacelift]
```

This will give you the (close to) zero-config version of the addon which is simply Storybook as-is, but with a light/dark theme variant toggler.

The addon and options available are meant to be as gracefull and unobtrusive as possible, and therefore most features of `storybook-facelift` are not enabled as default.

To get the most of the addon you may want to configure it through the options.

```js
import { withFacelift } from '@badgers/storybook-facelift'

export const parameters = {
  '@badgers/storybook-facelift': {
    enhanceUi: true,
  },
}

export const decorators = [withFacelift]
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

### **enhanceUi** | type: `boolean` | default: `false`

- Fix a lot of minor CSS errors
- Ensure UI contrast ratio (mostly text and with approximation towards Storybooks initial intent - _text for selected stories in menu have a lower tolerance for contrast ratio than 4.5 (will in fact allow > 2.62) to try to keep it white as intended by Storybook for instance)_.
- Pimp up some UI elements such as menu icons, buttons for for panels, overlay menus etc..

### **defaultTheme** | type: `string` | default: `undefined`

- Which theme to select as default
- if `undefined` then first available theme in **themes** option will be selected - note that if no themes are provided, then native theme is automatically enabled and selected.

### **defaultVariant** | type: `"light" | "dark"` | default: `"light"`

- Variant of default theme to use - if not set will then `light` variant will be chosen _unless browser is in `dark` mode_.

### **includeNative** | type: `boolean` | default: `false`

- Instruct the addon to include the native theme even if custom themes are provided
- Note that this setting is auto enabled if no themes are provided.

### **themeConverters** | type: `Parameters.ThemeConverters` | default: `false`

- Key value configuration of converters used in converting theme types into Storybook themes.
- Note that the keys `"native"` and `"mui"` are protected.

### **autoThemeStory** | type: `boolean` | default: `false`

- Set to `true` to automatically theme any component in a story of same type as the theme used.
- Note that this feature only works for `"mui"` typed themes.

### **override** | type: `Parameters.StorybookThemeOverride` | default: `undefined`

- Easy way to set the title, logo or url for the whole application.
- Note that these settings can be overriden in turn by themes.

  > #### **brandTitle** | type: `string`
  >
  > - Set title of storybook globally.
  >
  > #### **brandImage** | type: `string`
  >
  > - Set logo of storybook globally.
  >
  > #### **brandUrl** | type: `string`
  >
  > - Set url of title or logo of storybook globally.

### **native** | type: `Parameters.Native` | default: `undefined`

- Configure the native theme if included.

  > #### **title** | type: `string`
  >
  > - Name to display in theme picker menu
  > - If no value set, then "Native Theme" is used.
  >
  > #### **variants** | type: `Array<"light" | "dark">`
  >
  > - Array with either `"light"` or `"dark"` (or both - but that equals to omission) to select specifically which variants to load for native theme.
  > - If no value set, then both are selected.
  >
  > #### **background** | type: `"normal" | "reverse" | "equal" | "equal-reverse"`
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

### **ui** | type: `Parameters.UI` | default: `{ elevation: 2 }`

- Configure UI based settings
- Note that this requires `enhanceUi` to be set to `true`

  > #### **elevation** | type: `0 | 1 | 2 | 3`
  >
  > - Set the elevation level of the content panel - 0 is no elevation at all.
  >
  > #### **shadow** | type: `string`
  >
  > - Should you wish to provide your own shadown for the content panel, then add a valid `box-shadow` value here.
  >
  > #### **padding** | type: `string`
  >
  > - Provide a valid css string for `padding` and you can set the padding used in the Canvas panel.

### **docs** | type: `Parameters.Docs` | default: `{ type: "full" }`

- Configure settings for use in the Docs panel

  > #### **type** | type: `"full" | "simple"` | default: `"full"`
  >
  > - Setting this property to `"simple"` will remove all other elements in Docs panel apart from the documentation of properties.
  >
  > #### **hidePropertyBorders** | type: `boolean` | default: `undefined`
  >
  > - If set to `true` then borders between properties in documentation panel will be hidden.

### **themes** | type: `Array<Parameters.Theme>` | default: `undefined`

- Provide an array of theme configuration objects to be used as themes for Storybook.

  > #### **key** | type: `string`
  >
  > - Note this value is **_required_**.
  > - Unique key to identify this theme configuration.
  >
  > #### **type** | type: `"native" | "mui" | "?"`
  >
  > - Note this value is **_required_**.
  > - Used to indentify the converter to use in order to compile a Storybook theme.
  > - Only `"native"` and `"mui"` are supported by the addon, so if you wish to use a custom made type, you have to ensure that a corresponding converter function is added in **themeConverters** - and ensure that the `"type"` value is used as the key of the converter function.
  >
  > #### **title** | type: `string`
  >
  > - Note this value is **_required_**.
  > - The name to show in the theme menu picker.
  >
  > #### **previewOnly** | type: `boolean`
  >
  > - If set to `true`, this theme will not be added to the list of themes shown in the theme picker menu.
  >
  > #### **background** | type: `"normal" | "reverse" | "equal" | "equal-reverse"`
  >
  > - Allows you to choose how to apply the theme colors for app (appBg) and content (appContentBg) in theme.
  > - Applying `"reverse"` will use content background color on app, and app background color on content.
  > - Applying `"equal"` will use app background color both places, and `"equal-reverse"` will use content background color both places.
  > - If no value is set, then `"normal"` will be used.
  >
  > #### **override** | types: `Parameters.StorybookThemeOverride` | default: `undefined`
  >
  > - Set the title, logo or url for this theme only.
  > - See [Parameters.StorybookThemeOverride]() for properties.
  >
  > #### **variants** | type: `ThemeVariants`
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
