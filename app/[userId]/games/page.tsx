import { User } from '../../../types/schema'
import { CreateRecords } from './create-records'

let baseUrl = 'http://localhost:3000/api'

const getGames = async (userId: string) => {
  let res = await fetch(baseUrl + `/users/${userId}`)
  return (await res.json()) as User
}

// 346823643391590481

interface PageProps {
  params: { userId: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function Home({ params: { userId } }: PageProps) {
  let user = await getGames(userId)
  console.log({ user })

  const gameRecords = user.games_bucket_list.data

  return (
    <>
      <p>This is my page</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <ul className="bg-slate-500 p-3 rounded-md my-3">
        {gameRecords.length > 0 ? (
          gameRecords.map((item) => {
            return (
              <li>
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </li>
            )
          })
        ) : (
          <p>The list is empty 🤖 Add a new game to your bucket list!</p>
        )}

        <CreateRecords
          userId={user._id}
          // onCreate={() => getGames(userId)}
        />
      </ul>
    </>
  )
}
