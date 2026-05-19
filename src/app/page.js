import Hero from '@/components/home/Hero'
import Servicios from '@/components/home/Servicios'
import Ventajas from '@/components/home/Ventajas'
import ContactoRapido from '@/components/home/ContactoRapido'

export default function Home() {
  return (
    <main>
      <Hero />
      <Servicios />
      <Ventajas />
      <ContactoRapido />
    </main>
  )
}