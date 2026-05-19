'use client'
import { useState } from 'react'
import { Send, Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    proyecto: '',
    tipo_maquinaria: '',
    fecha_requerida: '',
    duracion: '',
    comentarios: '',
  })
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    try {
      const { error } = await supabase.from('solicitudes_cotizacion').insert([form])
      if (error) throw error
      setEnviado(true)
      setForm({
        nombre: '', empresa: '', telefono: '', correo: '',
        proyecto: '', tipo_maquinaria: '', fecha_requerida: '',
        duracion: '', comentarios: '',
      })
    } catch (err) {
      alert('Error al enviar: ' + err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0]">

      <div className="bg-[#115656] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Solicitar Cotizacion</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Completa el formulario y te contactamos a la brevedad con la mejor opcion para tu proyecto.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Info de contacto */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-bold text-[#115656] text-lg mb-6">Contacto directo</h2>
              <div className="flex flex-col gap-4">
                <a href="https://wa.me/50300000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-[#115656] transition-colors">
                  <div className="bg-green-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <MessageCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">WhatsApp</p>
                    <p className="font-medium">+503 0000-0000</p>
                  </div>
                </a>
                <a href="tel:+50300000000" className="flex items-center gap-3 text-gray-600 hover:text-[#115656] transition-colors">
                  <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Telefono</p>
                    <p className="font-medium">+503 0000-0000</p>
                  </div>
                </a>
                <a href="mailto:info@apesoluciones.com" className="flex items-center gap-3 text-gray-600 hover:text-[#115656] transition-colors">
                  <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Correo</p>
                    <p className="font-medium">info@apesoluciones.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Ubicacion</p>
                    <p className="font-medium">El Salvador</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#115656] text-white rounded-xl p-6">
              <h3 className="font-bold text-lg mb-2">Respuesta rapida</h3>
              <p className="text-green-200 text-sm mb-4">Preferible contactarnos por WhatsApp para una respuesta inmediata.</p>
              <a
                href="https://wa.me/50300000000?text=Hola%20quiero%20cotizar%20maquinaria%20de%20APE%20Soluciones"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#115656] px-5 py-3 rounded-lg font-bold text-sm hover:bg-green-50 transition-colors block text-center">
                Escribir por WhatsApp
              </a>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            {enviado ? (
              <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-100 text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={36} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#115656] mb-2">Solicitud enviada</h2>
                <p className="text-gray-600 mb-6">Recibimos tu solicitud. Te contactaremos pronto.</p>
                <button
                  onClick={() => setEnviado(false)}
                  className="bg-[#115656] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0c3f3f] transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
                <h2 className="font-bold text-[#115656] text-lg mb-2">Datos de contacto</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={form.nombre}
                      onChange={(e) => setForm({...form, nombre: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Empresa</label>
                    <input
                      type="text"
                      value={form.empresa}
                      onChange={(e) => setForm({...form, empresa: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefono *</label>
                    <input
                      type="tel"
                      required
                      value={form.telefono}
                      onChange={(e) => setForm({...form, telefono: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                      placeholder="+503 0000-0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo electronico *</label>
                    <input
                      type="email"
                      required
                      value={form.correo}
                      onChange={(e) => setForm({...form, correo: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                      placeholder="tu@correo.com"
                    />
                  </div>
                </div>

                <hr className="border-gray-100 my-2" />
                <h2 className="font-bold text-[#115656] text-lg">Detalles del proyecto</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de maquinaria</label>
                    <select
                      value={form.tipo_maquinaria}
                      onChange={(e) => setForm({...form, tipo_maquinaria: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="excavacion">Excavacion</option>
                      <option value="compactacion">Compactacion</option>
                      <option value="concreto">Concreto</option>
                      <option value="herramientas-electricas">Herramientas Electricas</option>
                      <option value="equipos-industriales">Equipos Industriales</option>
                      <option value="generadores">Generadores</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duracion del alquiler</label>
                    <select
                      value={form.duracion}
                      onChange={(e) => setForm({...form, duracion: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white"
                    >
                      <option value="">Seleccionar duracion</option>
                      <option value="1-dia">1 dia</option>
                      <option value="2-5-dias">2 a 5 dias</option>
                      <option value="1-semana">1 semana</option>
                      <option value="2-semanas">2 semanas</option>
                      <option value="1-mes">1 mes</option>
                      <option value="mas-1-mes">Mas de 1 mes</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del proyecto</label>
                    <input
                      type="text"
                      value={form.proyecto}
                      onChange={(e) => setForm({...form, proyecto: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                      placeholder="Ej: Construccion de bodega"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha requerida</label>
                    <input
                      type="date"
                      value={form.fecha_requerida}
                      onChange={(e) => setForm({...form, fecha_requerida: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios adicionales</label>
                  <textarea
                    rows={4}
                    value={form.comentarios}
                    onChange={(e) => setForm({...form, comentarios: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] resize-none"
                    placeholder="Describe tu proyecto o cualquier detalle adicional..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  className="bg-[#115656] text-white py-4 rounded-lg font-bold text-lg hover:bg-[#0c3f3f] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                >
                  <Send size={20} />
                  {enviando ? 'Enviando...' : 'Enviar solicitud'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}