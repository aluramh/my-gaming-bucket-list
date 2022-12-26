import { PropsWithChildren } from 'react'

export default function HomeLayout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto max-w-3xl px-4 pb-28">
      <div className="mt-3 mb-6 text-6xl font-bold">My Gaming Bucket List</div>
      <section id="home-content">{children}</section>
    </div>
  )
}
