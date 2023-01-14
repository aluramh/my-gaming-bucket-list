import type { NextApiRequest, NextApiResponse } from 'next'
import { getGame } from '../../../lib/model'

const handleGET = async (
  { query: { id } }: NextApiRequest,
  res: NextApiResponse
) => {
  console.log({ id })
  const game = await getGame(id as string)
  console.log({ game })
  return res.send(game)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case 'GET':
        handleGET(req, res)
        break

      default:
        throw new Error('Unsupported HTTP Method')
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send(JSON.stringify(error, null, 2))
  }
}
