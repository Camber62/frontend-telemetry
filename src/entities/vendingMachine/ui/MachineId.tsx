type Props = {
  id: number
  className?: string
}

export function MachineId({ id, className }: Props) {
  return <span className={className}>{`#${id}`}</span>
}
