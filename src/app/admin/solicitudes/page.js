'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Phone, Building, Calendar, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Solicitudes() {
  const router = useRouter()
  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [filtro, setFiltro] = useState('todas')

  useEffect(() => {
    const auth = localStorage.getItem('ape-admin')
    if (!auth) router.push('/admin/login')
    cargarSolicitudes()
  }, [])

  const cargarSolicitudes = async () => {
    const { data } = await supabase
      .from('solicitudes_cotizacion')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setSolicitudes(data)
    setCargando(false)
  }

  const cambiarEstado = async (id, estado) => {
    await supabase.from('solicitudes_cotizacion').update({ estado }).eq('id', id)
    cargarSolicitudes()
  }

  const filtradas = solicitudes.filter(s => {
    if (filtro === 'todas') return true
    return s.estado === filtro
  })

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-SV', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

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
          <h1 className="text-2xl font-bold text-[#115656]">Solicitudes de cotizacion</h1>
          <span className="bg-[#115656] text-white px-3 py-1 rounded-full text-sm font-medium">
            {solicitudes.length} total
          </span>
        </div>

        <div className="flex gap-3 mb-6 flex-wrap">
          {['todas', 'nueva', 'en-proceso', 'completada'].map((f) => (
            <button key={f} onClick={() => setFiltro(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filtro === f ? 'bg-[#115656] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>
              {f === 'todas' ? 'Todas' : f === 'nueva' ? 'Nuevas' : f === 'en-proceso' ? 'En proceso' : 'Completadas'}
            </button>
          ))}
        </div>

        {cargando ? (
          <div className="text-center py-20 text-gray-500">Cargando...</div>
        ) : filtradas.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">No hay solicitudes todavia.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtradas.map((s) => (
              <div key={s.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-[#115656] text-lg">{s.nombre}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${s.estado === 'nueva' ? 'bg-blue-100 text-blue-700' : s.estado === 'en-proceso' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {s.estado}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.empresa && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Building size={14} className="text-gray-400" />{s.empresa}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Phone size={14} className="text-gray-400" />{s.telefono}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Mail size={14} className="text-gray-400" />{s.correo}
                      </div>
                      {s.tipo_maquinaria && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Clock size={14} className="text-gray-400" />{s.tipo_maquinaria}
                        </div>
                      )}
                      {s.fecha_requerida && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar size={14} className="text-gray-400" />{s.fecha_requerida}
                        </div>
                      )}
                    </div>
                    {s.comentarios && (
                      <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3">{s.comentarios}</p>
                    )}
                    <p className="text-gray-400 text-xs">{formatFecha(s.created_at)}</p>
                  </div>
                  <div className="flex flex-col gap-2 min-w-fit">
                    <a href={`https://wa.me/${s.telefono.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors text-center">
                      Contactar WhatsApp
                    </a>
                    <a href={`mailto:${s.correo}`} className="border border-[#115656] text-[#115656] px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-center">
                      Enviar correo
                    </a>
                    <select value={s.estado} onChange={(e) => cambiarEstado(s.id, e.target.value)} className="border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-[#115656] bg-white">
                      <option value="nueva">Nueva</option>
                      <option value="en-proceso">En proceso</option>
                      <option value="completada">Completada</option>
                    </select>
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