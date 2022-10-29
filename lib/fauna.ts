import { GraphQLClient, gql } from 'graphql-request'

export const graphQLClient = new GraphQLClient(
  'https://graphql.us.fauna.com/graphql',
  {
    headers: {
      authorization: `Bearer ${process.env.FAUNA_ADMIN_KEY}`,
    },
  }
)
