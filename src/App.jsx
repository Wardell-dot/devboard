import { useState } from 'react'

const developers = [
  { id: 1, name: 'Wardell', role: 'Frontend Developer', level: 'Junior', stack: ['React', 'JavaScript', 'CSS'], available: true },
  { id: 2, name: 'Sarah Chen', role: 'UI Engineer', level: 'Mid', stack: ['React', 'TypeScript', 'Figma'], available: true },
  { id: 3, name: 'Marcus Reid', role: 'Full Stack Dev', level: 'Senior', stack: ['Node', 'React', 'PostgreSQL'], available: false },
  { id: 4, name: 'Priya Nair', role: 'React Developer', level: 'Mid', stack: ['React', 'Redux', 'Jest'], available: true },
  { id: 5, name: 'Tom Okafor', role: 'Frontend Engineer', level: 'Junior', stack: ['Vue', 'JavaScript', 'Sass'], available: false },
]

function StackTag({ tech }) {
  return <span className="tag">{tech}</span>
}

function DevCard({ dev, onSelect, selected }) {
  return (
    <div
      className={`card ${selected ? 'card--selected' : ''}`}
      onClick={() => onSelect(dev.id)}
    >
      <div className="card__header">
        <div className="card__avatar">{dev.name.charAt(0)}</div>
        <div>
          <div className="card__name">{dev.name}</div>
          <div className="card__role">{dev.role}</div>
        </div>
        <div className={`card__status ${dev.available ? 'status--open' : 'status--closed'}`}>
          {dev.available ? 'Open' : 'Closed'}
        </div>
      </div>
      <div className="card__level">
        <span className="label">Level</span>
        <span className="level-badge">{dev.level}</span>
      </div>
      <div className="card__stack">
        {dev.stack.map(tech => (
          <StackTag key={tech} tech={tech} />
        ))}
      </div>
    </div>
  )
}

function App() {
  const [selectedId, setSelectedId] = useState(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'Available'
    ? developers.filter(d => d.available)
    : filter === 'Closed'
    ? developers.filter(d => !d.available)
    : developers

  const selected = developers.find(d => d.id === selectedId)

  return (
    <div className="app">
      <header className="header">
        <div className="header__logo">DEVBOARD</div>
        <div className="header__filters">
          {['All', 'Available', 'Closed'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="header__count">{filtered.length} developers</div>
      </header>

      <main className="main">
        <div className="grid">
          {filtered.map(dev => (
            <DevCard
              key={dev.id}
              dev={dev}
              onSelect={setSelectedId}
              selected={selectedId === dev.id}
            />
          ))}
        </div>

        {selected && (
          <div className="detail">
            <div className="detail__label">Selected</div>
            <div className="detail__name">{selected.name}</div>
            <div className="detail__role">{selected.role} · {selected.level}</div>
            <div className="detail__stack">
              {selected.stack.map(t => <StackTag key={t} tech={t} />)}
            </div>
            <button className="detail__close" onClick={() => setSelectedId(null)}>Clear</button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App