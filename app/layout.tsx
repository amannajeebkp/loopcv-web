import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LoopCV - AI Job Search Automation | Apply to 1000+ Jobs Automatically',
  description: 'LoopCV is an AI-powered job search automation platform that finds and applies to thousands of jobs for you. Auto-apply to LinkedIn, Indeed, Glassdoor and 50+ job boards.',
  keywords: 'job search, auto apply, AI job application, resume optimizer, job automation, loopcv',
  openGraph: {
    title: 'LoopCV - AI Job Search Automation',
    description: 'Apply to 1000+ jobs automatically with AI',
    url: 'https://loopcv.vercel.app',
    siteName: 'LoopCV',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LoopCV - AI Job Search Automation',
    description: 'Apply to 1000+ jobs automatically with AI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  )
}
