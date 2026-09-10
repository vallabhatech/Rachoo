import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'CampusOS AI', description: 'AI-powered campus workflow automation' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}