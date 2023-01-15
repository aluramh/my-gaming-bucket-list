'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { CreateGameRecord } from '../../../pages/api/users/[id]/games'
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

  const handleCreateGame = async (payload: CreateGameRecord.RequestBody) => {
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
        <div className="my-3 rounded-md bg-red-300 p-3 text-red-900">
          <div className="flex flex-row justify-between">
            <span>There was an error!</span>

            <button
              data-testid="close-create-game-record-error"
              onClick={() => setError(null)}
              className="h-6 w-6 rounded-md text-red-500 transition-colors hover:bg-red-500 hover:text-white"
            >
              <XMarkIcon />
            </button>
          </div>
        </div>
      )}

      {/* TODO: - Remove */}
      <div className="flex flex-row gap-2">
        <button
          className="rounded-sm bg-teal-800 px-3 py-2"
          onClick={() =>
            handleCreateGame({
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
          className="rounded-sm bg-teal-800 px-3 py-2"
          onClick={() =>
            handleCreateGame({
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
