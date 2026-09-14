import { useEffect, useMemo, useRef, useState } from 'react'
import municipiosPorUf from '../municipiosPorUf.json'

function normalize(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

export default function MunicipioSelect({ id, uf, value, onChange }) {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const filtered = useMemo(() => {
    const options = municipiosPorUf[uf] || []
    const q = normalize(value.trim())
    if (!q) return options
    return options.filter((m) => normalize(m).includes(q))
  }, [value, uf])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectMunicipio = (nome) => {
    onChange(nome)
    setOpen(false)
  }

  return (
    <div className="municipio-select" ref={wrapperRef}>
      <input
        id={id}
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
        placeholder="Buscar município..."
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <ul className="municipio-options" role="listbox">
          {filtered.map((nome) => (
            <li key={nome}>
              <button
                type="button"
                role="option"
                onClick={() => selectMunicipio(nome)}
              >
                {nome}
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && value.trim() && filtered.length === 0 && (
        <ul className="municipio-options">
          <li className="municipio-empty">Nenhum município encontrado</li>
        </ul>
      )}
    </div>
  )
}
