import Link from 'next/link'
import { Shield, Clock, ThumbsUp, Users } from 'lucide-react'

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-[#115656] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quienes Somos</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Empresa salvadorena dedicada al alquiler de maquinaria para el sector construccion e industrial.
          </p>
        </div>
      </div>

      {/* Historia */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#115656] mb-6">Nuestra historia</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              APE Soluciones nacio con el objetivo de brindar soluciones practicas y confiables para el sector construccion e industrial en El Salvador. Desde nuestros inicios hemos trabajado con compromiso y dedicacion para ofrecer equipos en optimas condiciones.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Contamos con una amplia flota de maquinaria moderna y bien mantenida, lista para responder a las necesidades de proyectos de cualquier escala, desde pequeñas obras residenciales hasta grandes proyectos industriales.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nuestro equipo de profesionales esta siempre disponible para asesorarte y recomendarte el equipo mas adecuado para tu proyecto especifico.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#f0f0f0] rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#115656]">10+</p>
              <p className="text-gray-600 mt-2">Anos de experiencia</p>
            </div>
            <div className="bg-[#f0f0f0] rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#115656]">50+</p>
              <p className="text-gray-600 mt-2">Equipos disponibles</p>
            </div>
            <div className="bg-[#f0f0f0] rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#115656]">200+</p>
              <p className="text-gray-600 mt-2">Proyectos completados</p>
            </div>
            <div className="bg-[#f0f0f0] rounded-xl p-6 text-center">
              <p className="text-4xl font-bold text-[#115656]">100%</p>
              <p className="text-gray-600 mt-2">Clientes satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-4 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#115656]">Nuestros valores</h2>
            <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
              Los principios que guian cada decision que tomamos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center flex flex-col items-center gap-4">
              <div className="bg-[#115656] w-14 h-14 rounded-full flex items-center justify-center">
                <Shield size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-[#115656] text-lg">Confiabilidad</h3>
              <p className="text-gray-600 text-sm">Equipos en perfectas condiciones para que tu proyecto no se detenga.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center flex flex-col items-center gap-4">
              <div className="bg-[#115656] w-14 h-14 rounded-full flex items-center justify-center">
                <Clock size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-[#115656] text-lg">Puntualidad</h3>
              <p className="text-gray-600 text-sm">Entregamos y recogemos los equipos en el tiempo acordado.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center flex flex-col items-center gap-4">
              <div className="bg-[#115656] w-14 h-14 rounded-full flex items-center justify-center">
                <ThumbsUp size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-[#115656] text-lg">Calidad</h3>
              <p className="text-gray-600 text-sm">Mantenimiento constante para garantizar el mejor rendimiento.</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center flex flex-col items-center gap-4">
              <div className="bg-[#115656] w-14 h-14 rounded-full flex items-center justify-center">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="font-bold text-[#115656] text-lg">Servicio</h3>
              <p className="text-gray-600 text-sm">Atencion personalizada para cada cliente y proyecto.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#115656] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trabajemos juntos</h2>
          <p className="text-green-200 text-lg mb-8">
            Contactanos hoy y cuéntanos sobre tu proyecto. Tenemos el equipo ideal para ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="bg-white text-[#115656] px-8 py-4 rounded-lg font-bold hover:bg-green-50 transition-colors">
              Solicitar cotizacion
            </Link>
            <Link href="/catalogo" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-colors">
              Ver catalogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}