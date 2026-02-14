import React from 'react'
import { createIcon } from './IconBase'

export const X = createIcon('X', () => (
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
))
