import { DateRangePicker, QuickFilters, useDateFilter } from '@/features/filterByDate'
import { BFF_DEFAULT_PORT, BFF_START_COMMAND } from '@/shared/config'

type Props = {
  loading: boolean
  contentLoading: boolean
  error: string | null
  onRefresh: () => void
}

export function DashboardMainToolbar({ loading, contentLoading, error, onRefresh }: Props) {
  const { active, setActive } = useDateFilter()

  return (
    <>
      <header className="page-main__masthead">
        <h1 className="page-main__title">Мониторинг парка ТА</h1>
        {loading && !contentLoading && <p className="page-main__loading">Загрузка данных…</p>}
      </header>

      <div className="time-range-bar">
        <QuickFilters active={active} onSelect={setActive} />
        <DateRangePicker />
      </div>

      {error && (
        <div className="app-banner app-banner--error" role="alert">
          <p>{error}</p>
          <p className="app-banner__hint">
            Запустите BFF: <code>{BFF_START_COMMAND}</code> (порт {BFF_DEFAULT_PORT})
          </p>
          <button type="button" className="app-btn" onClick={() => void onRefresh()}>
            Повторить
          </button>
        </div>
      )}
    </>
  )
}
