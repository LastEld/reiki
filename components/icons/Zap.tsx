import React from 'react'
import { createIcon } from './IconBase'

export const Zap = createIcon('Zap', () => (
  <>
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    <line x1="12" y1="8" x2="12" y2="10" opacity="0.3" />
    <line x1="12" y1="14" x2="12" y2="16" opacity="0.3" />
  </>
))
