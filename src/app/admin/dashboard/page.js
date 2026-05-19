'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Package, PlusCircle, List, MessageSquare, LogOut, Settings } from 'lucide-react'

export default function Dashboard() {
  const router = useRouter()
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem('ape-admin')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setCargando(false)
    }
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('ape-admin')
    router.push('/admin/login')
  }

  if (cargando) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>

  return (
    <div className="min-h-screen bg-[#f0f0f0]">

      {/* Header admin */}
      <header className="bg-[#115656] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-lg p-1.5">
            <span className="text-[#115656] font-bold text-sm">APE</span>
          </div>
          <span className="font-bold text-lg">Panel Administrador</span>
        </div>
        <button onClick={cerrarSesion} className="flex items-center gap-2 text-green-200 hover:text-white transition-colors">
          <LogOut size={18} />
          Cerrar sesion
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Bienvenida */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[#115656]">Bienvenido al panel de control</h1>
          <p className="text-gray-600 mt-1">Administra el catalogo y las solicitudes de APE Soluciones.</p>
        </div>

        {/* Tarjetas de acceso rapido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link href="/admin/maquinaria" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3">
            <div className="bg-[#115656] w-12 h-12 rounded-lg flex items-center justify-center">
              <Package size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-[#115656] text-lg">Maquinaria</h3>
            <p className="text-gray-600 text-sm">Ver y administrar todo el catalogo.</p>
          </Link>
          <Link href="/admin/maquinaria/nueva" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3">
            <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <PlusCircle size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-[#115656] text-lg">Agregar equipo</h3>
            <p className="text-gray-600 text-sm">Agregar nueva maquinaria al catalogo.</p>
          </Link>
          <Link href="/admin/solicitudes" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3">
            <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-[#115656] text-lg">Solicitudes</h3>
            <p className="text-gray-600 text-sm">Ver cotizaciones recibidas.</p>
          </Link>
          <Link href="/admin/categorias" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-3">
            <div className="bg-amber-500 w-12 h-12 rounded-lg flex items-center justify-center">
              <List size={24} className="text-white" />
            </div>
            <h3 className="font-bold text-[#115656] text-lg">Categorias</h3>
            <p className="text-gray-600 text-sm">Administrar categorias del catalogo.</p>
          </Link>
        </div>

        {/* Links rapidos */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-[#115656] text-lg mb-4">Accesos rapidos</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/" target="_blank" className="border border-[#115656] text-[#115656] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f0f0f0] transition-colors">
              Ver sitio web
            </Link>
            <Link href="/catalogo" target="_blank" className="border border-[#115656] text-[#115656] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#f0f0f0] transition-colors">
              Ver catalogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}