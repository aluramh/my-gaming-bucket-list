import { gql } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../../../lib/fauna'
import { Game, GameRecord, GameStatus, User } from '../../../../types/schema'

const createGameRecord = (gameRecord) => {
  const query = gql`
    mutation CreateGameRecord($data: GameRecordInput!) {
      createGameRecord(data: $data) {
        _id
        game {
          title
        }
      }
    }
  `

  return graphQLClient.request(query, gameRecord)
}

export namespace CreateGame {
  export interface RequestBody {
    game: Game
    status: GameStatus
    userId: string
    listOrder: number // How do we compute this? Should it be nullable?
  }
}

export default async function handler(
  { method, ...req }: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId, game, status, listOrder }: CreateGame.RequestBody = req.body

  try {
    if (method === 'POST') {
      const data = {
        // owner: { connect: '346823643391590481' },
        owner: { connect: userId },
        game: { create: game },
        status: status,
        date_added: new Date().toISOString(),
        list_order: listOrder,
      }

      const response = await createGameRecord({ data })
      return res.send(response)
    }

    return res.status(400).end()
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }
}
