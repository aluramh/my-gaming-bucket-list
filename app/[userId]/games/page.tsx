'use client'

import React from 'react'
import { useUser } from '../../../hooks/useUser'
import { GameRecord } from '../../../types/schema'
import { CreateRecords } from './create-records'
import { GameRecordItem } from './GameRecordItem'
import GameSearchInput from './GameSearchInput'
import Loading from './loading'
let baseUrl = 'http://localhost:3000/api'

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

  const handleRemoveRecord = async (gameRecord: GameRecord) => {
    try {
      let res = await fetch(
        baseUrl + `/users/${userId}/games/${gameRecord._id}`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            gameRecordId: gameRecord._id,
            gameId: gameRecord.game._id,
          }),
        }
      )
      await res.json()

      refetch()
    } catch (error) {
      alert(
        'The game record cannot be deleted at this time. Please try again later.'
      )
      console.error(error)
    }
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
