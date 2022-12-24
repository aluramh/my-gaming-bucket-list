import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="container max-w-3xl mx-auto pb-28 px-4">
      <div className="text-6xl mt-4 mb-3 font-bold">My Gaming Bucket List</div>
      <section id="home-content">{children}</section>
    </div>
  )
}
