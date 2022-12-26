import { gql } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../../lib/fauna'
import { Game } from '../../../types/schema'

const getGame = async (id: string): Promise<Game | null> => {
  const query = gql`
    query FindUserById($id: ID!) {
      findUserByID(id: $id) {
        _id
        email
        gamertag
        # Could add pagination later if needed?
        games_bucket_list {
          data {
            _id
            status
            date_completed
            list_order
            notes
            date_added
            game {
              _id
              score
              year
              info
              hltb_id
              length
              title
            }
          }
        }
      }
    }
  `

  return graphQLClient
    .request(query, { id })
    .then(({ findUserByID: user }) => user)
}

export default async function handler(
  { query: { id } }: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const game = await getGame(id as string)
    return res.send(game)
  } catch (error) {
    return res.status(500).end()
  }
}
