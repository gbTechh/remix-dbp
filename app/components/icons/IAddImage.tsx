interface Props {
  w?: number
  h?: number
  color?: string
}

export const IAddImage = ({ w, h, color, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w ?? 24}
    height={h ?? 24}
    viewBox="0 0 24 24"
    className="flex items-center justify-center"
    {...props}
  >
    <path fill={color ?? '#fff'} d="M16 7a2 2 0 1 1-3.999.001A2 2 0 0 1 16 7Zm6.5 11H21v-1.5a1.5 1.5 0 1 0-3 0V18h-1.5a1.5 1.5 0 1 0 0 3H18v1.5a1.5 1.5 0 1 0 3 0V21h1.5a1.5 1.5 0 1 0 0-3ZM16 15l-4.923-4.923a3.645 3.645 0 0 0-5.154 0L3 13V5.5C3 4.121 4.122 3 5.5 3h10C16.878 3 18 4.121 18 5.5v6a1.5 1.5 0 1 0 3 0v-6C21 2.468 18.533 0 15.5 0h-10A5.506 5.506 0 0 0 0 5.5v10C0 18.532 2.467 21 5.5 21h6a1.5 1.5 0 0 0 1.5-1.5V19a3 3 0 0 1 3-3v-1Z" />
  </svg>
)

  
