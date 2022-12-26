'use client'

import React from 'react'
import { User } from '../../../types/schema'
import { CreateRecords } from './create-records'

let baseUrl = 'http://localhost:3000/api'

const fetchUser = async (userId: string) => {
  let res = await fetch(baseUrl + `/users/${userId}`)
  return (await res.json()) as User
}

// 346823643391590481

interface PageProps {
  params: { userId: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const useUser = (userId: string) => {
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    getUser()
  }, [userId])

  const getUser = async () => {
    let user = await fetchUser(userId)
    console.log({ user })
    setUser(user)
  }

  return { user, getUser }
}

export default function Home({ params: { userId } }: PageProps) {
  const { user } = useUser(userId)

  if (!user) {
    return null
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

        <CreateRecords
          userId={user._id}
          // onCreate={() => getGames(userId)}
        />
      </ul>
    </>
  )
}
