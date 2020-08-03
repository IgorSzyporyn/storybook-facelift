import { Typography, Box, BoxProps } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React, { useState } from 'react'
import { StoryMarkdown } from './StoryMarkdown'

const useStyles = makeStyles((theme) =>
  createStyles<'root', { hoverEffect?: boolean }>({
    root: {
      position: 'relative',

      '&:hover::after': {
        position: 'absolute',
        display: 'block',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: ({ hoverEffect }) =>
          hoverEffect ? theme.palette.action.hover : 'transparent',
        content: '""',
      },
    },
  })
)

type ActionType = 'hover' | 'active'

type ColorSquareProps = {
  action?: ActionType
  bgcolor: string
  color: string
  hoverEffect?: boolean
  theme: Theme
  title?: string
  subtitle?: string
} & BoxProps

type ColorSquareState = {
  action: ActionType | undefined
  hover: boolean
}

export const ColorSquare = ({
  action,
  bgcolor: background,
  className,
  color,
  hoverEffect,
  subtitle,
  theme,
  title,
  ...rest
}: ColorSquareProps) => {
  const [state, setState] = useState<ColorSquareState>({
    hover: false,
    action: action,
  })

  const classes = useStyles({ hoverEffect })

  const handleMouseEnter = () => {
    if (hoverEffect) {
      setState({ ...state, hover: true, action: 'hover' })
    }
  }

  const handleMouseLeave = () => {
    if (hoverEffect) {
      let action = state.action

      if (action === 'hover') {
        action = undefined
      }

      setState({ ...state, hover: false, action })
    }
  }

  return (
    <Box
      bgcolor={background}
      className={clsx(classes.root, className)}
      color={color}
      fontSize="caption.fontSize"
      height="100%"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      p={theme.spacing(1.5, 0, 1.5, 1.5)}
      {...rest}
    >
      {title && (
        <Typography variant="caption" component="span">
          <StoryMarkdown noMargin inheritStyles source={title} />
          {(state.action || hoverEffect) && `:${state.action}`}
        </Typography>
      )}
      {subtitle && (
        <Typography variant="caption" component="span">
          <StoryMarkdown noMargin inheritStyles source={subtitle} />
        </Typography>
      )}
      {theme && state.hover && hoverEffect && state.action && (
        <div>
          <Typography variant="caption" component="span">
            + {theme.palette.action[state.action]}
          </Typography>
        </div>
      )}
    </Box>
  )
}
