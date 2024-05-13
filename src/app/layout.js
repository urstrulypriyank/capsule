import { Inter } from 'next/font/google'
import './globals.css'
import SearchBar from '@/components/Headder/SearchBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Capsule',
  description: 'Find Medicines Easily',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchBar />
        {children}

      </body>
    </html>
  )
}
