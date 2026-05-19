import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#115656] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Columna 1 */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-lg p-2">
                <span className="text-[#115656] font-bold text-lg">APE</span>
              </div>
              <div>
                <p className="font-bold text-lg">APE Soluciones</p>
                <p className="text-green-200 text-xs">Alquiler de Maquinaria</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Empresa dedicada al alquiler de maquinaria para el sector 
              construcción e industrial. Equipos confiables, precios 
              competitivos y atención personalizada.
            </p>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navegación</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-green-200 hover:text-white transition-colors text-sm">Inicio</Link>
              <Link href="/catalogo" className="text-green-200 hover:text-white transition-colors text-sm">Catálogo de Maquinaria</Link>
              <Link href="/nosotros" className="text-green-200 hover:text-white transition-colors text-sm">Quiénes Somos</Link>
              <Link href="/contacto" className="text-green-200 hover:text-white transition-colors text-sm">Contacto</Link>
            </nav>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+50300000000" className="flex items-center gap-2 text-green-200 hover:text-white text-sm transition-colors">
                <Phone size={16} />
                +503 0000-0000
              </a>
              <a href="mailto:info@apesoluciones.com" className="flex items-center gap-2 text-green-200 hover:text-white text-sm transition-colors">
                <Mail size={16} />
                info@apesoluciones.com
              </a>
              <div className="flex items-center gap-2 text-green-200 text-sm">
                <MapPin size={16} />
                El Salvador
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-green-700 mt-10 pt-6 text-center text-green-300 text-sm">
          © {new Date().getFullYear()} APE Soluciones. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}