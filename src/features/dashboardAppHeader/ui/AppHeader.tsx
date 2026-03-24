import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'

type Props = {
  lastUpdated: Date | null
  loading: boolean
  onRefresh: () => void
}

export function AppHeader({ lastUpdated, loading, onRefresh }: Props) {
  const searchId = useId()
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const refreshBtnRef = useRef<HTMLButtonElement>(null)

  const searchMod = useMemo(
    () =>
      typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent)
        ? '⌘'
        : 'Ctrl',
    [],
  )

  const formatted = lastUpdated
    ? new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(lastUpdated)
    : '—'

  const onKeyRefresh = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'r' && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onRefresh()
        refreshBtnRef.current?.animate(
          [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }],
          { duration: 500, easing: 'ease-out' },
        )
      }
    },
    [onRefresh],
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyRefresh)
    return () => window.removeEventListener('keydown', onKeyRefresh)
  }, [onKeyRefresh])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNavOpen(false)
        setNotifOpen(false)
        setProfileOpen(false)
      }
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  useEffect(() => {
    const close = (e: MouseEvent) => {
      const el = e.target as Node
      if (el instanceof Element && el.closest('.app-header__inner')) return
      setNavOpen(false)
      setNotifOpen(false)
      setProfileOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <a href="#" className="app-header__logo" aria-label="На главную">
          <span className="app-header__logo-mark" aria-hidden>
            <svg width="34" height="36" viewBox="0 0 34 36" fill="none">
              <path
                d="M8 2L2 10v18l6 6h8l6-6V10L16 2H8z"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path d="M12 14h4v10h-4V14z" fill="white" opacity="0.9" />
            </svg>
          </span>
        </a>

        <nav
          className={`app-header__nav${navOpen ? ' app-header__nav--open' : ''}`}
          aria-label="Текущий объект"
        >
          <button
            type="button"
            className="app-header__nav-toggle"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span className="app-header__crumbs">Санкт-Петербург / Адмиралтейский</span>
            <span className="app-header__nav-row">
              <span className="app-header__title">Семёновский</span>
              <span className="app-header__addr">58</span>
              <span className="app-header__badge">район</span>
              <span className="app-header__chevron" aria-hidden>
                <svg width="12" height="8" viewBox="0 0 12 8">
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </span>
          </button>
          {navOpen && (
            <div className="app-header__nav-popover" role="menu">
              <button type="button" className="app-header__nav-item" role="menuitem">
                Василеостровский
              </button>
              <button type="button" className="app-header__nav-item" role="menuitem">
                Петроградский
              </button>
              <button type="button" className="app-header__nav-item" role="menuitem">
                Центральный
              </button>
            </div>
          )}
        </nav>

        <div className={`app-header__search${searchFocused ? ' app-header__search--focused' : ''}`}>
          <label htmlFor={searchId} className="visually-hidden">
            Поиск
          </label>
          <span className="app-header__search-icon" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5.25" stroke="#98A2B3" strokeWidth="1.5" />
              <path d="M11 11l3.5 3.5" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id={searchId}
            className="app-header__search-input"
            type="search"
            placeholder="Найти"
            autoComplete="off"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <kbd className="app-header__kbd-group" title="Быстрый поиск">
            <kbd className="app-header__kbd">{searchMod}</kbd>
            <kbd className="app-header__kbd">K</kbd>
          </kbd>
        </div>

        <div className="app-header__status">
          <button
            ref={refreshBtnRef}
            type="button"
            className="app-header__status-btn"
            onClick={onRefresh}
            disabled={loading}
            aria-busy={loading}
            title="Обновить данные"
          >
            <span className={`app-header__status-icon${loading ? ' app-header__status-icon--spin' : ''}`}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path
                  d="M13 4a9 9 0 1 0 9 9"
                  stroke="#D0D5DD"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="19" cy="7" r="2.5" fill="#17B26A" />
              </svg>
            </span>
          </button>
          <p className="app-header__updated">
            Обновлено
            <br />
            <time dateTime={lastUpdated?.toISOString()}>{formatted}</time>
          </p>
        </div>

        <div className="app-header__tool app-header__tool--notif">
          <button
            type="button"
            className="app-header__icon-btn"
            aria-expanded={notifOpen}
            aria-haspopup="true"
            onClick={() => {
              setNotifOpen((v) => !v)
              setProfileOpen(false)
            }}
            aria-label="Уведомления"
          >
            <span className="app-header__bell-wrap">
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path
                  d="M10 2a5 5 0 0 0-5 5v3.5L3 18h14l-2-7.5V7a5 5 0 0 0-5-5z"
                  stroke="#98A2B3"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinejoin="round"
                />
                <path d="M8 18a2 2 0 0 0 4 0" stroke="#98A2B3" strokeWidth="1.5" />
              </svg>
              <span className="app-header__notif-dot" />
            </span>
          </button>
          {notifOpen && (
            <div className="app-header__dropdown app-header__dropdown--notif" role="dialog">
              <p className="app-header__dropdown-title">Уведомления</p>
              <ul>
                <li>Низкий остаток на аппарате #124</li>
                <li>Индекс продаж вырос за неделю</li>
              </ul>
            </div>
          )}
        </div>

        <div className="app-header__tool">
          <button
            type="button"
            className="app-header__avatar-btn"
            aria-expanded={profileOpen}
            onClick={() => {
              setProfileOpen((v) => !v)
              setNotifOpen(false)
            }}
            aria-label="Профиль"
          >
            <span className="app-header__avatar">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=FigmaUser"
                alt=""
                width="56"
                height="56"
              />
            </span>
          </button>
          {profileOpen && (
            <div className="app-header__dropdown app-header__dropdown--profile" role="menu">
              <button type="button" role="menuitem">
                Настройки
              </button>
              <button type="button" role="menuitem">
                Выйти
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
