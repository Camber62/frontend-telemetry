import type { PopularAnalyticsMode } from '@/shared/config'

type Props = {
  value: PopularAnalyticsMode
  onChange: (v: PopularAnalyticsMode) => void
}

export function PopularAnalyticsModeToggle({ value, onChange }: Props) {
  return (
    <div className="pill-toggle" role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={value === 'products'}
        className={`pill-toggle__btn${value === 'products' ? ' pill-toggle__btn--on' : ''}`}
        onClick={() => onChange('products')}
      >
        Товары
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'categories'}
        className={`pill-toggle__btn${value === 'categories' ? ' pill-toggle__btn--on' : ''}`}
        onClick={() => onChange('categories')}
      >
        Категории
      </button>
    </div>
  )
}
