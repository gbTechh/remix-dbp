interface Props {
  w?: number
  h?: number
  color?: string
}

export const ILink = ({w, h, color, ...props}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={color ?? '#fff'}  d="M20 0h-9a1 1 0 1 0 0 2h9c.179 0 .352.024.518.068L.293 22.293a.999.999 0 1 0 1.414 1.414L21.932 3.482c.044.165.068.339.068.518v9a1 1 0 1 0 2 0V4c0-2.206-1.794-4-4-4Z" />
  </svg>
)

