export type BarRow = {
  value: number
  pct: number
  heightPct: number
  isOther: boolean
}

function Medal({ rank }: { rank: 1 | 2 | 3 }) {
  const roman: Record<1 | 2 | 3, string> = { 1: 'I', 2: 'II', 3: 'III' }
  return (
    <div className={`analytic-medal analytic-medal--r${rank}`} aria-hidden>
      {roman[rank]}
    </div>
  )
}

type Props = {
  rows: BarRow[]
  showValueInBar?: boolean
}

export function SixBarChart({ rows, showValueInBar }: Props) {
  return (
    <div className="analytic-bars" role="img" aria-label="Столбчатая диаграмма">
      {rows.map((row, i) => {
        const showMedal = i < 3 && !row.isOther
        const showPill = Boolean(showValueInBar && row.value > 0)
        return (
          <div key={i} className="analytic-bars__col">
            <div className="analytic-bars__well">
              <span className="analytic-bars__well-pct">{row.pct}%</span>
              <div className="analytic-bars__track">
                <div
                  className={`analytic-bars__bar-wrap${showPill ? ' analytic-bars__bar-wrap--pill' : ''}`}
                  style={{ height: `${row.heightPct}%` }}
                >
                  {showMedal ? (
                    <div className="analytic-bars__medal-on-bar">
                      <Medal rank={(i + 1) as 1 | 2 | 3} />
                    </div>
                  ) : null}
                  <div className="analytic-bars__fill-clip">
                    <div
                      className={`analytic-bars__fill${row.isOther ? ' analytic-bars__fill--other' : ''}`}
                    >
                      {showPill ? (
                        <span className="analytic-bars__fill-pill">
                          {row.value.toLocaleString('ru-RU')}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
