type Props = {
  variant?: 'accent' | 'muted'
  label?: string
}

export function ReportLink({ variant = 'accent', label = 'Перейти в отчёт' }: Props) {
  return (
    <a
      href="#"
      className={`report-link${variant === 'muted' ? ' report-link--muted' : ''}`}
      onClick={(e) => e.preventDefault()}
    >
      {label}
      <span className="report-link__arrow" aria-hidden>
        →
      </span>
    </a>
  )
}
