import type { NextApiRequest, NextApiResponse } from 'next'
import { createGameRecord } from '../../../../../lib/model'
import { Game, GameStatus } from '../../../../../types/schema'

export namespace CreateGameRecord {
  export interface RequestBody {
    game: Game
    status: GameStatus
    userId: string
    listOrder: number // How do we compute this? Should it be nullable?
    hltbId?: any
  }
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, game, status, listOrder }: CreateGameRecord.RequestBody =
    JSON.parse(req.body)

  // TODO: - Fix typing
  const payload: any = {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case 'POST':
        handlePOST(req, res)
        break

      default:
        throw new Error('Unsupported HTTP method: ' + req.method)
    }
  } catch (e) {
    console.error(e)
    return res.status(500).send(e)
  }
}
