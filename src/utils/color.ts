import { hslToRgb, hexToRgb } from '@material-ui/core'

/* eslint-disable no-case-declarations */
export type ColorTypes = 'hex' | 'rgb' | 'rgba' | 'hsl'

export function getColorType(color: string) {
  let type: ColorTypes = 'hex'

  if (color.charAt(0) !== '#' && color.length > 3) {
    if (color.substr(0, 4) === 'rgba') {
      type = 'rgba'
    } else {
      const indicator = color.substr(0, 3)

      switch (indicator) {
        case 'rgb':
          type = 'rgb'
          break
        case 'hsl':
          type = 'hsl'
          break
        default:
          break
      }
    }
  }

  return type
}

export function trimColor(_color = '') {
  const regExp = new RegExp(' ', 'g')
  const color = _color.replace(regExp, '')

  return color
}

function setRgbOpacity(_color: string, opacity: number) {
  let color = _color

  const rgb = _color.split(',')
  const blue = rgb[2].split(')')[0]
  rgb[2] = `${blue},${opacity})`

  color = rgb.join(',')

  return color
}

function setRgbaOpacity(_color: string, opacity: number) {
  let color = _color

  const rgba = _color.split(',')
  rgba[3] = `${opacity})`

  color = rgba.join(',')

  return color
}

export function setColorOpacity(_color: string, opacity: number) {
  const type = getColorType(_color)
  let color = trimColor(_color)
  let rgb = ''

  switch (type) {
    case 'rgb':
      color = setRgbOpacity(_color, opacity)
      break
    case 'rgba':
      color = setRgbaOpacity(_color, opacity)
      break
    case 'hsl':
      rgb = hslToRgb(_color)
      color = setRgbOpacity(rgb, opacity)
      break
    case 'hex':
      rgb = hexToRgb(_color)
      color = setRgbOpacity(rgb, opacity)
      break
    default:
      break
  }

  return color
}
