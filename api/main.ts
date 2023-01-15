import { CreateGameRecord } from '../pages/api/users/[id]/games'
import { GameRecord } from '../types/schema'

let baseUrl = process.env.BASE_URL || 'http://localhost:3000/api'

type RemoveGameRecordResponse = [
  { deleteGameRecord: { _id: string } },
  { deleteGame: { _id: string } }
]

export const removeGameRecord = async (
  userId: string,
  gameRecord: GameRecord
) => {
  let res = await fetch(baseUrl + `/users/${userId}/games/${gameRecord._id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      gameRecordId: gameRecord._id,
      gameId: gameRecord.game._id,
    }),
  })

  return (await res.json()) as RemoveGameRecordResponse
}

type CreateGameRecordResponse = {
  createGameRecord: { _id: '353954469141020757'; game: { title: 'Returnal' } }
}

export const createGameRecord = async (
  userId: string,
  payload: CreateGameRecord.RequestBody
) => {
  let res = await fetch(baseUrl + `/users/${payload.userId}/games`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  return (await res.json()) as CreateGameRecordResponse
}

/**
 * Update a specific gameRecord
 */
export const updateGameRecord = async (
  userId: string,
  gameRecord: GameRecord
) => {}

/**
 * Update the GameRecords of a User in batch
 */
export const updateUserGameRecords = async (
  userId: string,
  gameRecords: GameRecord[]
) => {}
