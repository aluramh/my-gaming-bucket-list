import React from 'react'
import './globals.css'

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <title>My title</title>
      </head>

      <body className="bg-slate-800 text-white" id="app-body">
        {children}
      </body>
    </html>
  )
}
