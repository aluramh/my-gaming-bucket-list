export interface User {
  id: string
  gamertag: string
  email?: string
  password?: string
  // created, updated, yada yada
}

export type GameStatus = 'in_progress' | 'done' | 'not_started'

export interface UserGame {
  user_id: string
  game_id: string
  list_order: number // how to guarantee unique...?
  status: GameStatus
  notes?: string // free-form
  date_added: string
  date_completed: string
}

export interface Game {
  id: string
  title: string
  length: number // hours, can have decimals
}
