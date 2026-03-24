import { ReportLink as SharedReportLink } from '@/shared/ui/report-link'

type Props = {
  label?: string
  variant?: 'accent' | 'muted'
}

export function ReportLink({ label = 'Перейти в отчет', variant = 'muted' }: Props) {
  return <SharedReportLink label={label} variant={variant} />
}
