interface Props {
  w?: number
  h?: number
  color?: string
}

export const IError = ({w, h, color, ...props}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={color ?? '#fff'} d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0Zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1-10 10Z" />
    <path fill={color ?? '#fff'} d="M12 5a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0V6a1 1 0 0 0-1-1Z" />
    <rect fill={color ?? '#fff'} width={2} height={2} x={11} y={17} rx={1} />
  </svg>
)

