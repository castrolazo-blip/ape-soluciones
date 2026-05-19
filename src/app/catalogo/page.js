import Link from 'next/link'
import { Search, Truck } from 'lucide-react'

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-[#f0f0f0]">

      <div className="bg-[#115656] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Catalogo de Maquinaria</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Encuentra el equipo ideal para tu proyecto.
          </p>
        </div>
      </div>

      <div className="bg-white shadow-sm px-4 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar maquinaria..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
            />
          </div>
          <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white">
            <option value="">Todas las categorias</option>
            <option value="excavacion">Excavacion</option>
            <option value="compactacion">Compactacion</option>
            <option value="concreto">Concreto</option>
            <option value="herramientas-electricas">Herramientas Electricas</option>
            <option value="equipos-industriales">Equipos Industriales</option>
            <option value="generadores">Generadores</option>
          </select>
          <select className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white">
            <option value="">Disponibilidad</option>
            <option value="disponible">Disponible</option>
            <option value="no-disponible">No disponible</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
              <div className="bg-[#115656]/10 h-48 flex items-center justify-center">
                <Truck size={64} className="text-[#115656]/30" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">Disponible</span>
                  <span className="text-gray-400 text-xs">Excavacion</span>
                </div>
                <h3 className="font-bold text-[#115656] text-lg mb-1">Retroexcavadora</h3>
                <p className="text-gray-600 text-sm mb-4">Equipo ideal para excavacion y movimiento de tierra.</p>
                <div className="flex gap-2">
                  <Link href="/catalogo/retroexcavadora" className="flex-1 bg-[#115656] text-white py-2 rounded-lg text-sm font-medium text-center hover:bg-[#0c3f3f] transition-colors">
                    Ver detalles
                  </Link>
                  <a href="https://wa.me/50300000000" target="_blank" rel="noopener noreferrer" className="flex-1 border border-[#115656] text-[#115656] py-2 rounded-lg text-sm font-medium text-center hover:bg-[#f0f0f0] transition-colors">
                    Cotizar
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}