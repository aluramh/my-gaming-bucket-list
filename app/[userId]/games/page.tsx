'use client'

import React from 'react'
import { useUser } from '../../../hooks/useUser'
import { GameRecord } from '../../../types/schema'
import { CreateRecords } from './create-records'
import { GameRecordItem } from './GameRecordItem'
import GameSearchInput from './GameSearchInput'
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

  if (isLoading) {
    return <Loading />
  }

  if (error || isLoadingError || !user) {
    return <div>Error!</div>
  }

  const handleRemoveRecord = (item: GameRecord) => {
    console.log('REMOVING =>', item)
  }

  const getList = () => {
    const gameRecords = user?.games_bucket_list?.data

    if (!gameRecords || gameRecords.length <= 0) {
      return <p>The list is empty 🤖 Add a new game to your bucket list!</p>
    }

    return (
      <ol className="gap-3">
        {gameRecords.map((item) => (
          <GameRecordItem
            key={item.game.title}
            gameRecord={item}
            onRemoveClick={() => handleRemoveRecord(item)}
          />
        ))}
      </ol>
    )
  }

  return (
    <>
      <GameSearchInput />

      <>{getList()}</>

      <CreateRecords userId={user._id} onCreate={() => refetch()} />
    </>
  )
}
