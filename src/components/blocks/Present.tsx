import React, { CSSProperties } from 'react'
import { Box, makeStyles, createStyles, Paper, PaperProps } from '@material-ui/core'
import clsx from 'clsx'
import { PresentFooter } from './PresentFooter'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    },
  })
)

type PresentProps = {
  bgcolor?: string
  color?: string
  colorCode?: string
  describedbyId?: string
  labelledbyId: string
  subtitle?: string
  title?: string
} & PaperProps

export const Present = ({
  bgcolor,
  children,
  className,
  color,
  colorCode,
  describedbyId,
  labelledbyId,
  subtitle,
  title,
  ...rest
}: PresentProps) => {
  const classes = useStyles()
  let style: CSSProperties = {}

  if (bgcolor) {
    style = {
      ...(rest.style || {}),
      backgroundColor: bgcolor,
    }
  }

  return (
    <Paper
      aria-describedby={describedbyId}
      aria-labelledby={labelledbyId}
      className={clsx(classes.root, className)}
      elevation={3}
      role="figure"
      style={style}
      {...rest}
    >
      <Box component="main">{children}</Box>
      <PresentFooter
        color={color}
        colorCode={colorCode}
        title={title}
        subtitle={subtitle}
        labelledbyId={labelledbyId}
        describedbyId={describedbyId}
      />
    </Paper>
  )
}
