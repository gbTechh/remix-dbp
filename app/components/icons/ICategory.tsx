interface Props {
  w?: number
  h?: number
  color?: string
}

export const ICategory = ({w, h, color, ...props}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={color ?? '#fff'} d="M13 20a5.006 5.006 0 0 0 5-5V6.243a3.972 3.972 0 0 0-1.172-2.829l-2.242-2.242A3.972 3.972 0 0 0 11.757 0H7a5.006 5.006 0 0 0-5 5v10a5.006 5.006 0 0 0 5 5zm-9-5V5a3 3 0 0 1 3-3s4.919.014 5 .024V4a2 2 0 0 0 2 2h1.976c.01.081.024 9 .024 9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zm18-7v11a5.006 5.006 0 0 1-5 5H8a1 1 0 0 1 0-2h9a3 3 0 0 0 3-3V8a1 1 0 0 1 2 0z" />
  </svg>
)

