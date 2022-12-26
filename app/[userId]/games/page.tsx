'use client'

import React from 'react'
import { useUser } from '../../../hooks/useUser'
import { CreateRecords } from './create-records'
import { GameRecordItem } from './GameRecordItem'
import Loading from './loading'

interface PageProps {
  params: { userId: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function Home({ params: { userId } }: PageProps) {
  const {
    data: user,
    error,
    isLoading,
    isLoadingError,
    refetch,
  } = useUser(userId)
  const [search, setSearch] = React.useState('')

  if (isLoading) {
    return <Loading />
  }

  if (error || isLoadingError || !user) {
    return <div>Error!</div>
  }

  const onAddClick = () => {
    setSearch('')
  }

  const onSearchChange = ({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(value)

    // Fetch from API
  }

  const getList = () => {
    const gameRecords = user.games_bucket_list.data

    if (!gameRecords || gameRecords.length <= 0) {
      return <p>The list is empty 🤖 Add a new game to your bucket list!</p>
    }

    return (
      <ol className="gap-3">
        {gameRecords.map((item) => (
          <GameRecordItem key={item.game.title} gameRecord={item} />
        ))}
      </ol>
    )
  }

  return (
    <>
      <div className="flex flex-row mb-3 w-full">
        <input
          placeholder="Search for a game"
          className="px-3 py-4 text-black rounded flex-1 mr-3"
          onChange={onSearchChange}
          value={search}
        />
        <button
          onClick={onAddClick}
          className="bg-slate-400 break-keep px-3 py-4"
        >
          Add game
        </button>
      </div>

      <>{getList()}</>

      <CreateRecords userId={user._id} onCreate={() => refetch()} />
    </>
  )
}
