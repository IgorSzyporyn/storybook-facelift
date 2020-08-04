import React, { ReactNode, useEffect, useState } from 'react'
import { PreviewStyles } from '../../styles/PreviewStyles'
import { useFaceliftSettings } from '../../hooks/UseFaceliftSettings'

type WithThemedPreviewProps = {
  children: ReactNode
}

export const WithFaceliftPreview = ({ children }: WithThemedPreviewProps) => {
  const settings = useFaceliftSettings()
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    if (settings) {
      setShowChildren(true)
    }
  }, [settings])

  return (
    <div className="with-facelift-preview">
      <PreviewStyles />
      {showChildren && children}
    </div>
  )
}
