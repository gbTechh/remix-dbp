interface Props {
  w?: number
  h?: number
  color?: string
}

export const IUpload = ({w, h, color, ...props}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={color ?? '#fff'} d="M11.007 2.578 11 18.016a1 1 0 0 0 1 1 1 1 0 0 0 1-1l.007-15.421 2.912 2.913a1 1 0 0 0 1.414 0 1 1 0 0 0 0-1.414L14.122.879a3 3 0 0 0-4.244 0L6.667 4.091a1 1 0 0 0 0 1.414 1 1 0 0 0 1.414 0Z" />
    <path fill={color ?? '#fff'}  d="M22 17v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1 1 1 0 0 0-1 1v4a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-4a1 1 0 0 0-1-1 1 1 0 0 0-1 1Z" />
  </svg>
)

