import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Seb Mécanique — Garage indépendant',
  description: 'Mécanicien indépendant CFC. Révisions, diagnostics électroniques, préparation, changement de pneus. Devis gratuit.',
  keywords: 'mécanicien, garage, révision, diagnostic, pneus, Seb Mécanique',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
