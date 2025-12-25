import React from 'react'
import { Image } from "./type"
import ImageError from "./components/Error/index.tsx"
import ImageLoading from "./components/Loading/index.tsx"

export const defaultProps: Image = {
  className: '',
  style: {},
  alt: '',
  objectFit: 'fill',
  src: '',
  fallback: '',
  lazy: false,
  shape: 'rect',
  loading: React.createElement(ImageLoading),
  error: React.createElement(ImageError),
  overlayContent: null,
  overlayTrigger: 'hover',
}
