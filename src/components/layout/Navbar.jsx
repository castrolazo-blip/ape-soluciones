'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="bg-[#115656] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white rounded-lg p-2">
              <span className="text-[#115656] font-bold text-xl">APE</span>
            </div>
            <div>
              <p className="text-white font-bold text-lg">APE Soluciones</p>
              <p className="text-green-200 text-xs">Alquiler de Maquinaria</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-green-200 font-medium">Inicio</Link>
            <Link href="/catalogo" className="text-white hover:text-green-200 font-medium">Catalogo</Link>
            <Link href="/nosotros" className="text-white hover:text-green-200 font-medium">Nosotros</Link>
            <Link href="/contacto" className="text-white hover:text-green-200 font-medium">Contacto</Link>
          </nav>
          <div className="hidden md:flex">
            <a href="https://wa.me/50300000000" target="_blank" rel="noopener noreferrer" className="bg-white text-[#115656] px-5 py-2.5 rounded-lg font-bold">Cotizar ahora</a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#0c3f3f] border-t border-green-700">
          <nav className="flex flex-col px-4 py-4 gap-4">
            <Link href="/" onClick={() => setOpen(false)} className="text-white font-medium py-2 border-b border-green-700">Inicio</Link>
            <Link href="/catalogo" onClick={() => setOpen(false)} className="text-white font-medium py-2 border-b border-green-700">Catalogo</Link>
            <Link href="/nosotros" onClick={() => setOpen(false)} className="text-white font-medium py-2 border-b border-green-700">Nosotros</Link>
            <Link href="/contacto" onClick={() => setOpen(false)} className="text-white font-medium py-2 border-b border-green-700">Contacto</Link>
            <a href="https://wa.me/50300000000" target="_blank" rel="noopener noreferrer" className="bg-white text-[#115656] px-5 py-3 rounded-lg font-bold text-center mt-2">Cotizar ahora</a>
          </nav>
        </div>
      )}
    </header>
  )
}
