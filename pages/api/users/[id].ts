import { gql } from 'graphql-request'
import type { NextApiRequest, NextApiResponse } from 'next'
import { graphQLClient } from '../../../lib/fauna'
import { User } from '../../../types/schema'

const getUser = async (id: string): Promise<User | null> => {
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
    if (!id || typeof id !== 'string') {
      return res.status(400).end()
    }

    const user = await getUser(
      id as string //'346823643391590481'
    )

    return res.status(200).send(user)
  } catch (error) {
    console.error(JSON.stringify({ error }, null, 2)) // log server error
    return res.status(200).send(null)
  }
}
