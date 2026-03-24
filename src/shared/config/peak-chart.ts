export type PeakChartType = 'line' | 'heat'

export const PEAK_TIME_BUCKET_LABELS = [
  '00:00 – 05:59',
  '06:00 – 09:59',
  '10:00 – 11:59',
  '12:00 – 15:59',
  '16:00 – 19:59',
  '20:00 – 23:59',
] as const
