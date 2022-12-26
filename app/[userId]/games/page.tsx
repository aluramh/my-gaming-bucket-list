'use client'

import React from 'react'
import { useUser } from '../../../hooks/useUser'
import { CreateRecords } from './create-records'
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

  const getList = () => {
    const gameRecords = user.games_bucket_list.data

    if (!gameRecords || gameRecords.length <= 0) {
      return <p>The list is empty 🤖 Add a new game to your bucket list!</p>
    }

    return gameRecords.map((item) => {
      return (
        <li>
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </li>
      )
    })
  }

  return (
    <>
      <p>This is my page</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <ul className="bg-slate-500 p-3 rounded-md my-3">
        <>{getList()}</>

        <CreateRecords userId={user._id} onCreate={() => refetch()} />
      </ul>
    </>
  )
}
