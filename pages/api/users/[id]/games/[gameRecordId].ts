import type { NextApiRequest, NextApiResponse } from 'next'
import { deleteGame, deleteGameRecord } from '../../../../../lib/model'

export namespace DeleteGameRecord {
  export interface RequestBody {
    gameRecordId: string
    gameId: string
  }
}
const handleDELETE = async (req: NextApiRequest, res: NextApiResponse) => {
  const { gameRecordId, gameId } = JSON.parse(
    req.body
  ) as DeleteGameRecord.RequestBody

  let promises: Promise<any>[] = [
    // Delete the game record first
    deleteGameRecord(gameRecordId),

    // Then delete the game item
    deleteGame(gameId),
  ]

  console.log('waiting for promises')
  const responses = await Promise.all(promises)
  return res.send(responses)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case 'DELETE':
        handleDELETE(req, res)
        break

      default:
        throw new Error('Unsupported HTTP method: ' + req.method)
    }
  } catch (e) {
    console.error('ERROR HEEEEERE', e)
    return res.status(500).send(e)
  }
}
