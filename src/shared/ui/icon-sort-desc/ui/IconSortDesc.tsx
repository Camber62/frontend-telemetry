type IconSortDescProps = {
  descending?: boolean
}

export function IconSortDesc({ descending = true }: IconSortDescProps) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      style={descending ? undefined : { transform: 'rotate(180deg)' }}
    >
      <path
        d="M4 5h10M4 9h7M4 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14 11l2 2-2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
