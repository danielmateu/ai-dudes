import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import { ProModal } from '@/components/ProModal'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dudes AI',
  description: 'Habla con las mentes más potentes del mundo',
  keywords: 'AI, Inteligencia Artificial, Chatbot, Chat, Bots, Bot',
  viewport: 'width=device-width, initial-scale=1',
  creator: 'Daniel Mateu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={cn("bg-secondary ", inter.className)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
