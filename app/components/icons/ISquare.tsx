interface Props {
  w?: number
  h?: number
  color?: string
}

export const ISquare = ({ w, h, color, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={color ?? '#fff'} d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5Zm3 19a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3Z" />
  </svg>
)

