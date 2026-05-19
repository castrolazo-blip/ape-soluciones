import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Truck } from 'lucide-react'

export default async function FichaMaquinaria({ params }) {
  const { slug } = await params

  const { data: maquina } = await supabase
    .from('maquinaria')
    .select('*, categorias(nombre, slug)')
    .eq('slug', slug)
    .single()

  if (!maquina) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f0f0]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#115656] mb-4">Equipo no encontrado</h1>
          <Link href="/catalogo" className="bg-[#115656] text-white px-6 py-3 rounded-lg font-bold">
            Ver catalogo
          </Link>
        </div>
      </div>
    )
  }

  const { data: relacionados } = await supabase
    .from('maquinaria')
    .select('id, nombre, slug, imagen_principal, estado')
    .eq('categoria_id', maquina.categoria_id)
    .neq('id', maquina.id)
    .limit(3)

  const whatsappMsg = `Hola%20quiero%20cotizar%20el%20equipo%20${encodeURIComponent(maquina.nombre)}%20de%20APE%20Soluciones`

  return (
    <div className="min-h-screen bg-[#f0f0f0]">

      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#115656]">Inicio</Link>
          <span>/</span>
          <Link href="/catalogo" className="hover:text-[#115656]">Catalogo</Link>
          <span>/</span>
          <span className="text-[#115656] font-medium">{maquina.nombre}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Link href="/catalogo" className="flex items-center gap-2 text-[#115656] hover:opacity-70 mb-6 w-fit">
          <ArrowLeft size={20} />
          Volver al catalogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            {maquina.imagen_principal ? (
              <img src={maquina.imagen_principal} alt={maquina.nombre} className="w-full h-96 object-cover" />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-[#115656]/10">
                <Truck size={96} className="text-[#115656]/30" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${maquina.estado === 'disponible' ? 'bg-green-100 text-green-700' : maquina.estado === 'alquilado' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                  {maquina.estado}
                </span>
                {maquina.categorias && (
                  <span className="text-gray-400 text-sm">{maquina.categorias.nombre}</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-[#115656] mb-3">{maquina.nombre}</h1>
              {maquina.descripcion && (
                <p className="text-gray-600 leading-relaxed">{maquina.descripcion}</p>
              )}
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-bold text-[#115656] mb-4">Datos tecnicos</h2>
              <div className="grid grid-cols-2 gap-3">
                {maquina.marca && (
                  <div>
                    <p className="text-xs text-gray-400">Marca</p>
                    <p className="font-medium text-gray-800">{maquina.marca}</p>
                  </div>
                )}
                {maquina.modelo && (
                  <div>
                    <p className="text-xs text-gray-400">Modelo</p>
                    <p className="font-medium text-gray-800">{maquina.modelo}</p>
                  </div>
                )}
                {maquina.capacidad && (
                  <div>
                    <p className="text-xs text-gray-400">Capacidad</p>
                    <p className="font-medium text-gray-800">{maquina.capacidad}</p>
                  </div>
                )}
                {maquina.precio && (
                  <div>
                    <p className="text-xs text-gray-400">Precio referencial</p>
                    <p className="font-medium text-[#115656]">{maquina.precio}</p>
                  </div>
                )}
                {maquina.codigo_interno && (
                  <div>
                    <p className="text-xs text-gray-400">Codigo</p>
                    <p className="font-medium text-gray-800">{maquina.codigo_interno}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <a href={`https://wa.me/50300000000?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer" className="bg-[#115656] text-white py-4 rounded-lg font-bold text-center text-lg hover:bg-[#0c3f3f] transition-colors">
                Cotizar por WhatsApp
              </a>
              <Link href="/contacto" className="border-2 border-[#115656] text-[#115656] py-4 rounded-lg font-bold text-center hover:bg-[#f0f0f0] transition-colors">
                Solicitar cotizacion formal
              </Link>
            </div>
          </div>
        </div>

        {relacionados && relacionados.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-[#115656] mb-6">Equipos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relacionados.map((r) => (
                <Link key={r.id} href={`/catalogo/${r.slug}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="h-40 bg-[#115656]/10 overflow-hidden">
                    {r.imagen_principal ? (
                      <img src={r.imagen_principal} alt={r.nombre} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Truck size={48} className="text-[#115656]/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#115656]">{r.nombre}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${r.estado === 'disponible' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {r.estado}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}