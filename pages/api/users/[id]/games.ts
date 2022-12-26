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
    hltbId?: any
  }
}

export default async function handler(
  { method, ...req }: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { userId, game, status, listOrder }: CreateGame.RequestBody =
      JSON.parse(req.body)

    if (method === 'POST') {
      const payload = {
        data: {
          owner: { connect: userId },
          game: { create: game },
          list_order: listOrder,
          status: status || GameStatus.NotStarted,
          date_added: new Date().toISOString(),
        },
      }

      const response = await createGameRecord(payload)

      return res.send(response)
    }

    return res.status(400).end()
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
}
