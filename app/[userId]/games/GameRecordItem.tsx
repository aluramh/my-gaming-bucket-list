import React from 'react'
import { GameRecord } from '../../../types/schema'
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface Props {
  gameRecord: GameRecord
  onRemoveClick(): void
}

export const GameRecordItem = ({
  gameRecord: { game, ...stats },
  onRemoveClick,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="mb-3 rounded-md bg-slate-500 px-4 py-3">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <h1 className="mb-3 text-2xl text-slate-50">
            {game.title}{' '}
            {game.year && (
              <span className="text-lg text-slate-300">({game.year})</span>
            )}
          </h1>

          <button
            data-testid="remove-game-record"
            onClick={onRemoveClick}
            className="h-6 w-6 rounded-md text-slate-300 transition-colors hover:bg-red-500 hover:text-white"
          >
            <XMarkIcon />
          </button>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-row">
            <ClockIcon className="mr-2 h-6 w-6 text-slate-300" />
            <div className="text-slate-100">
              {game.length} {game.length > 1 ? 'hrs' : 'hr'}
            </div>
          </div>

          {game.score && (
            <div>
              <div>{game.score}</div>
            </div>
          )}
        </div>

        <div className="flex flex-row" data-testid="game-info">
          {game.info}
        </div>
      </div>
    </div>
  )
}
