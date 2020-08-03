import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { StoryMarkdown } from './StoryMarkdown'

type PresentFooterProps = {
  color?: string
  colorCode?: string
  describedbyId?: string
  labelledbyId?: string
  subtitle?: string
  title?: string
}

export const PresentFooter = ({
  color,
  colorCode,
  describedbyId,
  labelledbyId,
  subtitle,
  title,
  ...rest
}: PresentFooterProps) => {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-between"
      p={1.5}
      hidden={!title && !subtitle && !colorCode}
      {...rest}
    >
      <Box color={color}>
        <Box hidden={!title}>
          <Typography
            variant="subtitle2"
            component="h6"
            id={labelledbyId}
            gutterBottom={!colorCode}
          >
            {title ? (
              <StoryMarkdown noMargin inheritStyles source={title} />
            ) : (
              'Single color presentation'
            )}
          </Typography>
        </Box>
        {colorCode && (
          <Box>
            <Typography variant="caption" component="h6" gutterBottom>
              {colorCode}
            </Typography>
          </Box>
        )}
        <Box hidden={!subtitle}>
          <Typography color="textSecondary" variant="caption" component="h6" id={describedbyId}>
            {subtitle ? (
              <StoryMarkdown noMargin inheritStyles source={subtitle} />
            ) : (
              'Figure representing a single color or a single color variation in theme.palette'
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
