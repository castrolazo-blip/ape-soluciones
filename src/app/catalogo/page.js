'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Truck } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Catalogo() {
  const [maquinaria, setMaquinaria] = useState([])
  const [categorias, setCategorias] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [disponibilidadFiltro, setDisponibilidadFiltro] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    const { data: maq } = await supabase
      .from('maquinaria')
      .select('*, categorias(nombre, slug)')
      .order('created_at', { ascending: false })
    if (maq) setMaquinaria(maq)

    const { data: cats } = await supabase
      .from('categorias')
      .select('*')
      .order('nombre')
    if (cats) setCategorias(cats)

    setCargando(false)
  }

  const filtrados = maquinaria.filter(m => {
    const matchBusqueda = m.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const matchCategoria = categoriaFiltro ? m.categoria_id === categoriaFiltro : true
    const matchDisponibilidad = disponibilidadFiltro ? m.estado === disponibilidadFiltro : true
    return matchBusqueda && matchCategoria && matchDisponibilidad
  })

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
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
            />
          </div>
          <select
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white"
          >
            <option value="">Todas las categorias</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
          <select
            value={disponibilidadFiltro}
            onChange={(e) => setDisponibilidadFiltro(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white"
          >
            <option value="">Todos los estados</option>
            <option value="disponible">Disponible</option>
            <option value="alquilado">Alquilado</option>
            <option value="mantenimiento">En mantenimiento</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {cargando ? (
          <div className="text-center py-20 text-gray-500">Cargando maquinaria...</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontro maquinaria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtrados.map((m) => (
              <div key={m.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
                <div className="bg-[#115656]/10 h-48 overflow-hidden">
                  {m.imagen_principal ? (
                    <img src={m.imagen_principal} alt={m.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Truck size={64} className="text-[#115656]/30" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      m.estado === 'disponible' ? 'bg-green-100 text-green-700' :
                      m.estado === 'alquilado' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {m.estado}
                    </span>
                    <span className="text-gray-400 text-xs">{m.categorias?.nombre}</span>
                  </div>
                  <h3 className="font-bold text-[#115656] text-lg mb-1">{m.nombre}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{m.descripcion}</p>
                  <div className="flex gap-2">
                    <Link href={`/catalogo/${m.slug}`} className="flex-1 bg-[#115656] text-white py-2 rounded-lg text-sm font-medium text-center hover:bg-[#0c3f3f] transition-colors">
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
        )}
      </div>
    </div>
  )
}