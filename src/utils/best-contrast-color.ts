import { lighten, darken, getContrastRatio } from '@material-ui/core'

const nearestValue = (arr: number[], val: number) =>
  arr.reduce((p, n) => (Math.abs(p) > Math.abs(n - val) ? n - val : p), Infinity) + val

type PickProps = {
  colors: string[]
  background: string
  ratio: number
}

function pick({ colors, background, ratio }: PickProps) {
  const ratios = colors.map((color) => getContrastRatio(color, background))
  const bestRatio = nearestValue(ratios, ratio)
  const bestRatioIndex = ratios.indexOf(bestRatio)

  const color = colors[bestRatioIndex]

  return color
}

type GetColorsProps = {
  color1?: string
  color2?: string
}

function getColors(props?: GetColorsProps) {
  const options = props || {}

  const color1 = options.color1 || '#ffffff'
  const color2 = options.color2 || color1

  const colors = []

  for (let i = 0; i < 10; i += 1) {
    const modifier1 = i / 10
    const modifier2 = modifier1 + 0.05

    colors.push(lighten(color1, modifier1))
    colors.push(lighten(color1, modifier2))
    colors.push(darken(color1, modifier1))
    colors.push(darken(color1, modifier2))

    colors.push(lighten(color2, modifier1))
    colors.push(lighten(color2, modifier2))
    colors.push(darken(color2, modifier1))
    colors.push(darken(color2, modifier2))
  }

  return [...new Set(colors)]
}

type BestContrastColorProps = {
  colors?: string[]
  color1?: string
  color2?: string
  background: string
  ratio?: number
}

export function bestContrastColor({
  colors: _colors,
  color1,
  color2,
  background,
  ratio,
}: BestContrastColorProps) {
  let colors = _colors

  if (!colors) {
    colors = getColors({ color1, color2 })
  }

  const color = pick({
    colors,
    background,
    ratio: ratio || 4.5,
  })

  return color as string
}
