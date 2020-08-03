import React, { ReactNode } from 'react'
import { PreviewStyles } from '../../styles/PreviewStyles'

type WithThemedPreviewProps = {
  children: ReactNode
}

export const WithThemedPreview = ({ children }: WithThemedPreviewProps) => {
  return (
    <div>
      <PreviewStyles />
      {children}
    </div>
  )
}
