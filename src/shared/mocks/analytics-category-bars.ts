export type StaticBarRow = {
  value: number
  pct: number
  heightPct: number
  isOther: boolean
}

export const POPULAR_CATEGORIES_BARS_STATIC: StaticBarRow[] = [
  { value: 200, pct: 12, heightPct: 72, isOther: false },
  { value: 150, pct: 9, heightPct: 58, isOther: false },
  { value: 93, pct: 6, heightPct: 42, isOther: false },
  { value: 85, pct: 4, heightPct: 38, isOther: false },
  { value: 72, pct: 3, heightPct: 34, isOther: false },
  { value: 350, pct: 66, heightPct: 100, isOther: true },
]
