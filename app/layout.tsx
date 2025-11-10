import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InsureHub Pro - Insurance Broking Platform',
  description: 'Comprehensive insurance broking platform for intermediaries',
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
