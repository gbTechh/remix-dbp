interface Props {
  w?: number
  h?: number
  color?: string
}

export const ITag = ({w, h, color, ...props}: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill={color ?? '#fff'} d="M20.137 24a2.8 2.8 0 0 1-1.987-.835L12 17.051l-6.15 6.118a2.8 2.8 0 0 1-3.095.609A2.8 2.8 0 0 1 1 21.154V5a5 5 0 0 1 5-5h12a5 5 0 0 1 5 5v16.154a2.8 2.8 0 0 1-1.751 2.624 2.867 2.867 0 0 1-1.112.222ZM6 2a3 3 0 0 0-3 3v16.154a.843.843 0 0 0 1.437.6l6.863-6.821a1 1 0 0 1 1.41 0l6.855 6.819a.843.843 0 0 0 1.437-.6V5a3 3 0 0 0-3-3Z" />
  </svg>
)


