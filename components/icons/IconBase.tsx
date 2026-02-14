import React from 'react'

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'width' | 'height'> {
  className?: string
  size?: number
  width?: number | string
  height?: number | string
}

export const createIcon = (
  displayName: string,
  renderPath: () => React.ReactNode
): React.FC<IconProps> => {
  const Icon: React.FC<IconProps> = ({ className = '', size, width, height, ...props }) => {
    const computedWidth = width ?? size ?? 24
    const computedHeight = height ?? size ?? 24

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={computedWidth}
        height={computedHeight}
        className={className}
        {...props}
      >
        {renderPath()}
      </svg>
    )
  }

  Icon.displayName = displayName
  return Icon
}
