import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'

const geist = Geist({ subsets: ['latin'] })

export const metadata = {
  title: 'APE Soluciones - Alquiler de Maquinaria',
  description: 'Empresa dedicada al alquiler de maquinaria para el sector construcción e industrial en El Salvador.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-white`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}