'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlusCircle, Pencil, Trash2, Search } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AdminMaquinaria() {
  const router = useRouter()
  const [maquinaria, setMaquinaria] = useState([])
  const [cargando, setCargando] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    const auth = localStorage.getItem('ape-admin')
    if (!auth) router.push('/admin/login')
    cargarMaquinaria()
  }, [])

  const cargarMaquinaria = async () => {
    const { data } = await supabase
      .from('maquinaria')
      .select('*, categorias(nombre)')
      .order('created_at', { ascending: false })
    if (data) setMaquinaria(data)
    setCargando(false)
  }

  const eliminar = async (id) => {
    if (!confirm('Seguro que deseas eliminar este equipo?')) return
    await supabase.from('maquinaria').delete().eq('id', id)
    cargarMaquinaria()
  }

  const filtrados = maquinaria.filter(m =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f0f0f0]">
      <header className="bg-[#115656] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1.5">
            <span className="text-[#115656] font-bold text-sm">APE</span>
          </div>
          <span className="font-bold text-lg">Panel Administrador</span>
        </div>
        <Link href="/admin/dashboard" className="text-green-200 hover:text-white transition-colors text-sm">
          Volver al dashboard
        </Link>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#115656]">Maquinaria</h1>
          <Link href="/admin/maquinaria/nueva" className="bg-[#115656] text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-[#0c3f3f] transition-colors">
            <PlusCircle size={18} />
            Agregar equipo
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar maquinaria..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
            />
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-20 text-gray-500">Cargando...</div>
        ) : filtrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500 mb-4">No hay maquinaria registrada aun.</p>
            <Link href="/admin/maquinaria/nueva" className="bg-[#115656] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#0c3f3f] transition-colors">
              Agregar primer equipo
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600">Equipo</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">Categoria</th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">Estado</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtrados.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {m.imagen_principal ? (
                          <img src={m.imagen_principal} alt={m.nombre} className="w-12 h-12 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#115656]/10 flex items-center justify-center">
                            <span className="text-[#115656] text-xs font-bold">APE</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{m.nombre}</p>
                          <p className="text-gray-400 text-xs">{m.codigo_interno}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm hidden md:table-cell">
                      {m.categorias?.nombre || '-'}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        m.estado === 'disponible' ? 'bg-green-100 text-green-700' :
                        m.estado === 'alquilado' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {m.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/maquinaria/${m.id}`} className="p-2 text-[#115656] hover:bg-[#115656]/10 rounded-lg transition-colors">
                          <Pencil size={16} />
                        </Link>
                        <button onClick={() => eliminar(m.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}