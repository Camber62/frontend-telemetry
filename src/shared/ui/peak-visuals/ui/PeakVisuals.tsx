import { useId } from 'react'
import type { PeakSaleTimeAtDay } from '@/entities/dashboard'
import { PEAK_TIME_BUCKET_LABELS } from '@/shared/config/peak-chart'

function hourFromPeak(s: string): number {
  const h = parseInt(s.split(':')[0] ?? '0', 10)
  return Number.isFinite(h) ? Math.min(23, Math.max(0, h)) : 0
}

function hourToBucket(hour: number): number {
  if (hour < 6) return 0
  if (hour < 10) return 1
  if (hour < 12) return 2
  if (hour < 16) return 3
  if (hour < 20) return 4
  return 5
}

function bucketIndexPerDay(peaks: PeakSaleTimeAtDay[]): number[] {
  const byDay = new Map<number, number>()
  peaks.forEach((p) => {
    if (p.day >= 1 && p.day <= 31) {
      byDay.set(p.day, hourToBucket(hourFromPeak(p.peakSalesTime)))
    }
  })
  return Array.from({ length: 31 }, (_, i) => byDay.get(i + 1) ?? 2)
}

const VB_W = 620
const VB_H = 200
const PAD_T = 8
const PAD_B = 4
const PLOT_H = VB_H - PAD_T - PAD_B

function dayPoints(buckets: number[]): { x: number; y: number }[] {
  return buckets.map((b, i) => ({
    x: ((i + 1 - 0.5) / 31) * VB_W,
    y: PAD_T + ((b + 0.5) / 6) * PLOT_H,
  }))
}

function polylinePoints(pts: { x: number; y: number }[]): string {
  return pts.map((p) => `${p.x},${p.y}`).join(' ')
}

type LineProps = { peaks: PeakSaleTimeAtDay[] }

export function PeakLineChart({ peaks }: LineProps) {
  const gid = useId().replace(/:/g, '')
  const gradId = `peakArea-${gid}`
  const buckets = bucketIndexPerDay(peaks)
  const pts = dayPoints(buckets)
  const linePts = polylinePoints(pts)
  const areaPts =
    pts.length > 0
      ? `${pts[0].x},${VB_H} ${linePts} ${pts[pts.length - 1].x},${VB_H}`
      : ''

  return (
    <div className="peak-line-chart" role="img" aria-label="Пиковые продажи по дням месяца">
      <div className="peak-line-chart__y-labels" aria-hidden>
        {PEAK_TIME_BUCKET_LABELS.map((label) => (
          <span key={label} className="peak-line-chart__y-label">
            {label}
          </span>
        ))}
      </div>
      <div className="peak-line-chart__main">
        <svg
          className="peak-line-chart__svg"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(45 55 72 / 22%)" />
              <stop offset="100%" stopColor="rgb(45 55 72 / 0%)" />
            </linearGradient>
          </defs>
          {Array.from({ length: 31 }, (_, i) => {
            const x = ((i + 0.5) / 31) * VB_W
            return (
              <line
                key={i}
                x1={x}
                y1={PAD_T}
                x2={x}
                y2={VB_H - PAD_B}
                className="peak-line-chart__grid-v"
              />
            )
          })}
          {areaPts ? <polygon fill={`url(#${gradId})`} points={areaPts} className="peak-line-chart__area" /> : null}
          {linePts ? (
            <polyline
              fill="none"
              stroke="#2d3748"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              points={linePts}
              className="peak-line-chart__line"
            />
          ) : null}
        </svg>
        <div className="peak-line-chart__x-axis">
          {Array.from({ length: 31 }, (_, i) => (
            <span key={i} className="peak-line-chart__x-tick">
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PeakHeatmap({ peaks }: LineProps) {
  const grid: number[][] = Array.from({ length: 6 }, () => Array(31).fill(0.1))
  peaks.forEach((p) => {
    if (p.day >= 1 && p.day <= 31) {
      const b = hourToBucket(hourFromPeak(p.peakSalesTime))
      grid[b][p.day - 1] = 0.95
    }
  })

  return (
    <div className="peak-heat peak-heat--bands" role="img" aria-label="Тепловая карта: дни × интервалы времени">
      <div className="peak-heat__y-labels" aria-hidden>
        {PEAK_TIME_BUCKET_LABELS.map((label) => (
          <span key={label} className="peak-line-chart__y-label">
            {label}
          </span>
        ))}
      </div>
      <div className="peak-heat__body">
        <div className="peak-heat__grid peak-heat__grid--6x31">
          {grid.map((row, bi) => (
            <div key={bi} className="peak-heat__row">
              {row.map((intensity, di) => (
                <div
                  key={di}
                  className="peak-heat__cell"
                  style={{
                    background: `rgb(45 55 72 / ${intensity})`,
                  }}
                  title={`День ${di + 1}, ${PEAK_TIME_BUCKET_LABELS[bi]}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="peak-heat__x peak-heat__x--31">
          {Array.from({ length: 31 }, (_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
