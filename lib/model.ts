import { gql } from 'graphql-request'
import { Game, GameRecord } from '../types/schema'
import { graphQLClient } from './fauna'

export const getGame = async (id: string): Promise<Game | null> => {
  const query = gql`
    query ($id: ID! = "hltb_id") {
      findGameByID(id: $id) {
        title
      }
    }
  `

  return graphQLClient
    .request(query, { id })
    .then(({ findGameByID: game }) => game)
}

export const deleteGame = (gameId: string) => {
  const query = gql`
    mutation DeleteGame($id: ID!) {
      deleteGame(id: $id) {
        _id
      }
    }
  `

  return graphQLClient
    .request(query, { id: gameId })
    .then((response) => response)
}

export const deleteGameRecord = async (gameRecordId: string) => {
  const query = gql`
    mutation DeleteGameRecord($id: ID!) {
      deleteGameRecord(id: $id) {
        _id
      }
    }
  `

  return graphQLClient
    .request(query, { id: gameRecordId })
    .then((response) => response)
}

export const createGameRecord = (gameRecord: GameRecord) => {
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
