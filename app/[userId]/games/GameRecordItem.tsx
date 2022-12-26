import React from 'react'
import { GameRecord } from '../../../types/schema'
import { ClockIcon } from '@heroicons/react/24/outline'

interface Props {
  gameRecord: GameRecord
}

export const GameRecordItem = ({
  gameRecord: { game, ...stats },
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="mb-3 rounded-md bg-slate-500 px-4 py-3">
      <div className="flex flex-col">
        <h1 className="mb-3 text-2xl text-slate-50">
          {game.title}{' '}
          {game.year && (
            <span className="text-lg text-slate-300">({game.year})</span>
          )}
        </h1>

        <div className="flex flex-row">
          <div className="flex flex-row">
            <ClockIcon className="mr-2 text-slate-300" style={{ width: 24 }} />
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

        <div className="flex flex-row">{game.info}</div>
      </div>
    </div>
  )
}
