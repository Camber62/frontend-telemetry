import { useState } from 'react'

const TOP = [
  { id: 'home', label: 'Главная', Icon: IconHome },
  { id: 'analytics', label: 'Аналитика', Icon: IconAnalytics },
  { id: 'data', label: 'Данные', Icon: IconDatabase },
  { id: 'promo', label: 'Акции', Icon: IconGift },
  { id: 'lang', label: 'Язык', Icon: IconTranslate },
] as const

const BOTTOM = [
  { id: 'help', label: 'Помощь', Icon: IconHelp },
  { id: 'chat', label: 'Чат', Icon: IconChat },
] as const

export function IconRail() {
  const [active, setActive] = useState(0)

  return (
    <aside className="icon-rail" aria-label="Основное меню">
      <div className="icon-rail__top">
        {TOP.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`icon-rail__btn${active === i ? ' icon-rail__btn--active' : ''}`}
            title={item.label}
            aria-label={item.label}
            aria-current={active === i ? 'true' : undefined}
            onClick={() => setActive(i)}
          >
            <span className="icon-rail__icon">
              <item.Icon active={active === i} />
            </span>
          </button>
        ))}
      </div>
      <div className="icon-rail__bottom">
        {BOTTOM.map((item, j) => {
          const i = j + TOP.length
          return (
            <button
              key={item.id}
              type="button"
              className={`icon-rail__btn${active === i ? ' icon-rail__btn--active' : ''}`}
              title={item.label}
              aria-label={item.label}
              onClick={() => setActive(i)}
            >
              <span className="icon-rail__icon">
                <item.Icon active={active === i} />
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}

function IconHome({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"
        stroke={c}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconAnalytics({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 19V5" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M5 19h14" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M9 15v-5" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 11v9" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 8v12" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconDatabase({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke={c} strokeWidth="2" />
      <path
        d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6"
        stroke={c}
        strokeWidth="2"
      />
      <path
        d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6"
        stroke={c}
        strokeWidth="2"
      />
    </svg>
  )
}

function IconGift({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="10" width="18" height="11" rx="1" stroke={c} strokeWidth="2" />
      <path d="M12 10V21" stroke={c} strokeWidth="2" />
      <path
        d="M12 10H8.5a2.5 2.5 0 0 1 0-5C11 5 12 10 12 10zm0 0h3.5a2.5 2.5 0 0 0 0-5C13 5 12 10 12 10z"
        stroke={c}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconTranslate({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 5h7M9 5v14M6 19h6"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 8l4 10m-4 0l4-10m-2 10h-4"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconHelp({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2" />
      <path
        d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 1.5-2.5 3.5"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="0.75" fill={c} />
    </svg>
  )
}

function IconChat({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 6h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"
        stroke={c}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}
