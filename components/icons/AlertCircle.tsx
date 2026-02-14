import React from 'react'
import { createIcon } from './IconBase'

export const AlertCircle = createIcon('AlertCircle', () => (
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </>
))
