import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sales Verification',
  description: 'Submit your verification request to initiate a verification call',
  keywords: 'sales verification, verification form, call verification',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-slate-50 text-slate-900 font-sans">
        <main>{children}</main>
      </body>
    </html>
  )
}
