import { Box, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { PaletteColor } from '@material-ui/core/styles/createPalette'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ColorSquare } from './ColorSquare'
import { Present } from './Present'

type Classes = 'root' | 'colorSquare' | 'footerHeader'

const useStyles = makeStyles((theme) =>
  createStyles<Classes, PresentColorProps>({
    root: {
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    },
    colorSquare: {
      height: '100%',
    },
    footerHeader: {
      padding: theme.spacing(2),
      display: 'flex',
      justifyContent: 'space-between',
    },
  })
)

type PresentColorProps = {
  title?: string
  subtitle?: string
  color: PaletteColor
  theme: Theme
}

export const PresentColor = (props: PresentColorProps) => {
  const { title, subtitle, color, theme } = props

  const describedbyId = `describedby-${uuidv4()}`
  const labelledbyId = `labelledby-${uuidv4()}`

  const classes = useStyles(props)

  return (
    <Present
      describedbyId={describedbyId}
      labelledbyId={labelledbyId}
      subtitle={subtitle}
      title={title}
    >
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }}>
        <Box
          component="section"
          height={{ xs: theme.spacing(8), sm: theme.spacing(20), md: theme.spacing(28) }}
          width={{ xs: '100%', sm: '55%' }}
        >
          <ColorSquare
            bgcolor={color.main}
            className={classes.colorSquare}
            color={color.contrastText}
            subtitle={color.main}
            theme={theme}
            title="main"
          />
        </Box>
        <Box
          component="section"
          display="flex"
          flexDirection="column"
          height={{ xs: theme.spacing(16), sm: theme.spacing(20), md: theme.spacing(28) }}
          width={{ xs: '100%', sm: '45%' }}
        >
          <ColorSquare
            bgcolor={color.light}
            className={classes.colorSquare}
            color={color.contrastText}
            subtitle={color.light}
            theme={theme}
            title="light"
          />
          <ColorSquare
            bgcolor={color.dark}
            className={classes.colorSquare}
            color={color.contrastText}
            subtitle={color.dark}
            theme={theme}
            title="dark"
          />
        </Box>
      </Box>
      <Box
        bgcolor={color.main}
        color={color.contrastText}
        component="section"
        height={{ xs: theme.spacing(8) }}
        p={1.5}
      >
        <Typography variant="caption" component="p">
          contrastText
        </Typography>
        <Typography variant="caption" component="p">
          {color.contrastText}
        </Typography>
      </Box>
    </Present>
  )
}
