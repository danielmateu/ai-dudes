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
  title: 'AI Dudes',
  description: 'Habla con las mentes más potentes del mundo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es" suppressHydrationWarning>
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
