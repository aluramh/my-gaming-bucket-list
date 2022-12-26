'use client'

import React from 'react'
import { CreateGame } from '../../../pages/api/users/[id]/games'
import { MOCK_GAMES } from '../../../tests/mocks'
import { GameStatus } from '../../../types/schema'
let baseUrl = 'http://localhost:3000/api'

interface Props {
  userId: string
  onCreate?: () => void
}

/**
 * TODO: Replace this as a "useCreateRecord" hook that handles the error and the loading, etc.
 * @param props
 * @returns
 */
export const CreateRecords: React.FC<Props> = ({ userId, onCreate }) => {
  const [error, setError] = React.useState<Error | null>(null)

  const handleClick = async (payload: CreateGame.RequestBody) => {
    try {
      let res = await fetch(baseUrl + `/users/${payload.userId}/games`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      await res.json()

      // Execute the callback prop
      onCreate?.()
    } catch (error) {
      setError(error as Error)
      console.error(error)
    }
  }

  return (
    <>
      {error && (
        <div className="bg-red-300 p-3 rounded-md my-3 text-red-900">
          <div
            className="flex flex-row justify-between"
            onClick={() => setError(null)}
          >
            <span>There was an error!</span>
            <button>X</button>
          </div>
        </div>
      )}

      <div className="flex flex-row gap-2">
        <button
          className="px-3 py-2 bg-teal-800 rounded-sm"
          onClick={() =>
            handleClick({
              userId: userId,
              listOrder: 1,
              status: GameStatus.NotStarted,
              game: MOCK_GAMES[0],
            })
          }
        >
          Add Returnal
        </button>

        <button
          className="px-3 py-2 bg-teal-800 rounded-sm"
          onClick={() =>
            handleClick({
              userId: userId,
              listOrder: 2,
              status: GameStatus.NotStarted,
              game: MOCK_GAMES[1],
            })
          }
        >
          Add Into the Breach
        </button>
      </div>
    </>
  )
}
