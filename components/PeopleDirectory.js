'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/image'

export default function PeopleDirectory({ people }) {
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')

  const roles = useMemo(
    () => Array.from(new Set(people.map((p) => p.role).filter(Boolean))).sort(),
    [people]
  )
  const locations = useMemo(
    () => Array.from(new Set(people.map((p) => p.location).filter(Boolean))).sort(),
    [people]
  )

  const filtered = people.filter(
    (p) => (!role || p.role === role) && (!location || p.location === location)
  )

  return (
    <>
      <div className="search-row" style={{marginBottom: 32}}>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">All Locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No people match those filters.</div>
      ) : (
        <div className="people-grid">
          {filtered.map((p) => (
            <Link className="person" key={p.slug} href={`/community/people/${p.slug}`}>
              <div className="ph">
                {p.photo && <img src={urlFor(p.photo).width(400).height(420).url()} alt={p.name} />}
              </div>
              <h4>{p.name}</h4>
              {p.role && <div className="role">{p.role}</div>}
              {p.location && <div className="loc">{p.location}</div>}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
