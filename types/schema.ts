export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export enum GameStatus {
  InProgress = 'in_progress',
  Done = 'done',
  NotStarted = 'not_started',
}

export type Game = {
  __typename?: 'Game'
  hltb_id: Scalars['ID']
  title: Scalars['String']
  length: Scalars['Float']
  score?: Maybe<Scalars['Float']>
  year?: Maybe<Scalars['Int']>
  info?: Maybe<Scalars['String']>
}

export type GameRecord = {
  __typename?: 'GameRecord'
  owner: User
  game: Game
  list_order: Scalars['Int']
  status: GameStatus
  notes?: Maybe<Scalars['String']>
  date_added: Scalars['String']
  date_completed?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  _id: Scalars['String']
  email: Scalars['String']
  gamertag: Scalars['String']
  games_bucket_list: { data: Array<GameRecord> }
  password: Scalars['String']
  date_created: Scalars['String']
}
