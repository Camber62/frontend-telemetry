import { useState } from 'react'

const NAV = [
  {
    id: 'monitor',
    label: 'Монитор парка ТА',
    Icon: IconLaptopSearch,
  },
  {
    id: 'remote',
    label: 'Удаленное управление ТА',
    Icon: IconTower,
  },
  {
    id: 'register',
    label: 'Регистрация ТА',
    Icon: IconPlug,
  },
  {
    id: 'decom',
    label: 'Вывод ТА из эксплуатации',
    Icon: IconPower,
  },
] as const

export function SubNav() {
  const [active, setActive] = useState(0)

  return (
    <aside className="sub-nav" aria-label="Раздел администрирования">
      <div className="sub-nav__head">
        <h2 className="sub-nav__title">
          Администрирование
          <br />и мониторинг
        </h2>
      </div>
      <nav className="sub-nav__list">
        {NAV.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={`sub-nav__item${active === i ? ' sub-nav__item--active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="sub-nav__icon" aria-hidden>
              <item.Icon active={active === i} />
            </span>
            <span className="sub-nav__text">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

function IconLaptopSearch({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2" y="4" width="12" height="9" rx="1.5" stroke={c} strokeWidth="1.5" />
      <path d="M1 15h14" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="14.5" cy="13.5" r="3.5" stroke={c} strokeWidth="1.5" />
      <path d="M17 16l2 2" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconTower({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2v16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6 6c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5v10H6V6z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4 18h12" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconPlug({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M7 3v4M13 3v4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6 7h8v3a4 4 0 0 1-8 0V7z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 14v4" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconPower({ active }: { active: boolean }) {
  const c = active ? '#101828' : '#98A2B3'
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 2v6"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.36 5.64a7 7 0 1 1-8.72 0"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
