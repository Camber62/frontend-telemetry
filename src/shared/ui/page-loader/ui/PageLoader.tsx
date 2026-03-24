type Props = {
  label?: string
}

export function PageLoader({ label = 'Загрузка данных…' }: Props) {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-busy="true">
      <div className="page-loader__spinner" aria-hidden />
      <p className="page-loader__label">{label}</p>
    </div>
  )
}
