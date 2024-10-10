import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio - Paul Olaniyan',
  description: 'Personal portfolio of Paul Olaniyan - Web Developer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}