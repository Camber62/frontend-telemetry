export function indexBarTone(pct: number): 'green' | 'amber' | 'red' {
  if (pct >= 67) return 'green'
  if (pct >= 34) return 'amber'
  return 'red'
}

export function cashMetricTone(pct: number): 'red' | 'orange' | 'green' {
  if (pct >= 80 || pct <= 25) return 'red'
  if (pct > 45 && pct < 70) return 'green'
  return 'orange'
}
