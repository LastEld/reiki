import React from 'react'
import { createIcon } from './IconBase'

export const Moon = createIcon('Moon', () => (
  <>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <circle cx="9" cy="9" r="1" opacity="0.3" />
    <circle cx="12" cy="14" r="0.5" opacity="0.3" />
  </>
))
