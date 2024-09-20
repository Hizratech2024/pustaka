"use client"
import { usePathname } from 'next/navigation'
import Template from './component/Template'
import Provider from './component/Provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <title>I-Tech Komputer</title> */}
        
      </head>

      <body>
        <Provider>
        <Template children={children} />
        </Provider>
      </body>
    </html>
  )
}
