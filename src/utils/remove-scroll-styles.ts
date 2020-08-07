import deepmerge from 'ts-deepmerge'

type RemoveScrollStylesProps = {
  horizontal?: boolean
  vertical?: boolean
  styles?: Record<string, any>
}

export function removeScrollStyles({
  horizontal,
  vertical,
  styles: _styles = {},
}: RemoveScrollStylesProps) {
  let styles: Record<string, any> = {}

  if (!horizontal && !vertical) {
    styles['& > .os-scrollbar'] = { display: 'none' }
  }

  if (horizontal) {
    styles['& > .os-scrollbar-horizontal'] = { display: 'none' }
    styles['& > .os-padding'] = {
      overflowY: 'hidden',
      '& > .os-viewport': {
        overflowX: 'hidden !important',
      },
    }
  }

  if (vertical) {
    styles['& > .os-scrollbar-vertical'] = { display: 'none' }
    styles['& > .os-padding'] = {
      ...(styles['& > .os-padding'] || {}),
      overflowY: 'hidden !important',
      '& > .os-viewport': {
        ...(styles['& > .os-padding'] ? styles['& > .os-padding']['& > .os-viewport'] : {}),
        overflowY: 'hidden',
      },
    }
  }

  styles = deepmerge(_styles, styles)

  return styles
}
