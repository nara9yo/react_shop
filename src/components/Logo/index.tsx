import type { HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<SVGSVGElement> {
  title?: string
}

const Logo = ({ className, title = 'ReactShop', ...rest }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      className={className}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* Handle */}
        <path d="M8 7V6a4 4 0 1 1 8 0v1" />
        {/* Bag */}
        <path d="M5.5 7.5h13l-1.1 11a2 2 0 0 1-2 1.8H8.6a2 2 0 0 1-2-1.8l-1.1-11Z" />
        {/* Accent check */}
        <path d="M9.2 12.5l2.0 2.0 3.6-3.6" />
      </g>
    </svg>
  )
}

export default Logo


