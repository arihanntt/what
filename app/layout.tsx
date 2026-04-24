import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  title: 'MapleLMS – AI-Powered Enterprise Learning Platform',
  description: 'MapleLMS is the AI-driven LMS platform that builds smarter teams, accelerates onboarding, and turns learning into measurable business impact.',
  openGraph: {
    title: 'MapleLMS – AI-Powered Enterprise Learning Platform',
    description: 'The AI-driven LMS for enterprise teams that need to learn faster and perform better.',
    url: 'https://www.maplelms.com',
    siteName: 'MapleLMS',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}

