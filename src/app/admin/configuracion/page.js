'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Save, ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Configuracion() {
  const router = useRouter()
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [config, setConfig] = useState({
    telefono: '',
    whatsapp: '',
    correo: '',
    direccion: '',
    nombre_empresa: 'APE Soluciones',
    slogan: 'Alquiler de Maquinaria',
    descripcion_empresa: '',
    hero_titulo: '',
    hero_subtitulo: '',
    facebook: '',
    instagram: '',
  })

  useEffect(() => {
    const auth = localStorage.getItem('ape-admin')
    if (!auth) router.push('/admin/login')
    cargarConfig()
  }, [])

  const cargarConfig = async () => {
    const { data } = await supabase.from('configuracion').select('*')
    if (data) {
      const obj = {}
      data.forEach(item => { obj[item.clave] = item.valor })
      setConfig(prev => ({ ...prev, ...obj }))
    }
    setCargando(false)
  }

  const guardar = async (e) => {
    e.preventDefault()
    setGuardando(true)
    try {
      for (const [clave, valor] of Object.entries(config)) {
        await supabase.from('configuracion').upsert({ clave, valor }, { onConflict: 'clave' })
      }
      alert('Configuracion guardada correctamente')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setGuardando(false)
    }
  }

  if (cargando) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>

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

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/dashboard" className="text-[#115656] hover:opacity-70">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-[#115656]">Configuracion del sitio</h1>
        </div>

        <form onSubmit={guardar} className="flex flex-col gap-6">

          {/* Informacion de contacto */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-[#115656] text-lg mb-6">Informacion de contacto</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <input
                    type="text"
                    value={config.telefono}
                    onChange={(e) => setConfig({...config, telefono: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                    placeholder="+503 0000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Numero WhatsApp</label>
                  <input
                    type="text"
                    value={config.whatsapp}
                    onChange={(e) => setConfig({...config, whatsapp: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                    placeholder="50300000000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Correo electronico</label>
                <input
                  type="email"
                  value={config.correo}
                  onChange={(e) => setConfig({...config, correo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  placeholder="info@apesoluciones.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Direccion</label>
                <input
                  type="text"
                  value={config.direccion}
                  onChange={(e) => setConfig({...config, direccion: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  placeholder="San Salvador, El Salvador"
                />
              </div>
            </div>
          </div>

          {/* Informacion de la empresa */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-[#115656] text-lg mb-6">Informacion de la empresa</h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la empresa</label>
                  <input
                    type="text"
                    value={config.nombre_empresa}
                    onChange={(e) => setConfig({...config, nombre_empresa: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slogan</label>
                  <input
                    type="text"
                    value={config.slogan}
                    onChange={(e) => setConfig({...config, slogan: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Descripcion de la empresa</label>
                <textarea
                  rows={3}
                  value={config.descripcion_empresa}
                  onChange={(e) => setConfig({...config, descripcion_empresa: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] resize-none"
                  placeholder="Empresa dedicada al alquiler de maquinaria..."
                />
              </div>
            </div>
          </div>

          {/* Textos del Hero */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-[#115656] text-lg mb-6">Textos de la pagina principal</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titulo principal</label>
                <input
                  type="text"
                  value={config.hero_titulo}
                  onChange={(e) => setConfig({...config, hero_titulo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  placeholder="Maquinaria confiable para tu proyecto"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitulo</label>
                <input
                  type="text"
                  value={config.hero_subtitulo}
                  onChange={(e) => setConfig({...config, hero_subtitulo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  placeholder="Equipos funcionales, precios competitivos..."
                />
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-[#115656] text-lg mb-6">Redes sociales</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="text"
                  value={config.facebook}
                  onChange={(e) => setConfig({...config, facebook: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  placeholder="https://facebook.com/apesoluciones"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="text"
                  value={config.instagram}
                  onChange={(e) => setConfig({...config, instagram: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                  placeholder="https://instagram.com/apesoluciones"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-[#115656] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#0c3f3f] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {guardando ? 'Guardando...' : 'Guardar configuracion'}
          </button>
        </form>
      </div>
    </div>
  )
}