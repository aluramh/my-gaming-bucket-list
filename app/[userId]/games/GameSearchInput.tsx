'use client'

import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import { fetchGames } from '../../../hooks/useSearchGames'

const fetchGames = async (query: string | undefined) => {
  const games = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
  ]

  let filteredGames = games

  if (query && query !== '') {
    filteredGames = games.filter((person) =>
      person.name
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(query.toLowerCase().replace(/\s+/g, ''))
    )
  }

  return filteredGames
}

export default function GameSearchInput() {
  const [games, setGames] = useState([123])
  const [selected, setSelected] = useState()
  const [query, setQuery] = useState('')

  const onAddClick = async () => {
    try {
      fetchGames()
    } catch (error) {}
  }

  const onSearchChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(value)

    // Fetch from API
  }

  return (
    <div className="relative mb-3 flex w-full flex-row">
      <input
        placeholder="Search for a game"
        className="mr-3 flex-1 rounded px-3 py-4 text-black"
        onChange={onSearchChange}
        value={query}
      />

      {/* TODO: - Implement */}
      {/* {games.length > 0 && (
        <ul className="absolute -bottom-16 bg-slate-300 px-4 py-3">
          {games.map((game) => (
            <li>"game"</li>
          ))}
        </ul>
      )} */}

      <button
        onClick={onAddClick}
        className="break-keep rounded bg-teal-600 px-3 py-4"
      >
        Add game
      </button>
    </div>
  )
}
