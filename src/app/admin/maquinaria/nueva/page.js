'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function NuevaMaquinaria() {
  const router = useRouter()
  const [cargando, setCargando] = useState(false)
  const [categorias, setCategorias] = useState([])
  const [imagen, setImagen] = useState(null)
  const [preview, setPreview] = useState(null)
  const [form, setForm] = useState({
    nombre: '',
    categoria_id: '',
    descripcion: '',
    marca: '',
    modelo: '',
    capacidad: '',
    estado: 'disponible',
    disponibilidad: true,
    destacada: false,
    codigo_interno: '',
    precio: '',
  })

  useEffect(() => {
    const auth = localStorage.getItem('ape-admin')
    if (!auth) router.push('/admin/login')
    cargarCategorias()
  }, [])

  const cargarCategorias = async () => {
    const { data } = await supabase.from('categorias').select('*').order('nombre')
    if (data) setCategorias(data)
  }

  const handleImagen = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagen(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setCargando(true)

    try {
      let imagen_url = null

      if (imagen) {
        const ext = imagen.name.split('.').pop()
        const filename = `${Date.now()}.${ext}`
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('maquinaria-imagenes')
          .upload(filename, imagen)

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('maquinaria-imagenes')
          .getPublicUrl(filename)

        imagen_url = urlData.publicUrl
      }

      const slug = form.nombre.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        + '-' + Date.now()

      const { error } = await supabase.from('maquinaria').insert([{
        ...form,
        slug,
        imagen_principal: imagen_url,
      }])

      if (error) throw error

      alert('Maquinaria agregada correctamente')
      router.push('/admin/maquinaria')
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setCargando(false)
    }
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

      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/maquinaria" className="text-[#115656] hover:opacity-70">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-[#115656]">Agregar nueva maquinaria</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-6">

          {/* Imagen */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen principal</label>
            <div
              onClick={() => document.getElementById('imagen-input').click()}
              className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex items-center justify-center cursor-pointer hover:border-[#115656] transition-colors overflow-hidden"
            >
              {preview ? (
                <img src={preview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <Upload size={32} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">Clic para subir imagen</p>
                </div>
              )}
            </div>
            <input id="imagen-input" type="file" accept="image/*" onChange={handleImagen} className="hidden" />
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del equipo *</label>
            <input
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({...form, nombre: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
              placeholder="Ej: Retroexcavadora CAT 420"
            />
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria *</label>
            <select
              required
              value={form.categoria_id}
              onChange={(e) => setForm({...form, categoria_id: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white"
            >
              <option value="">Seleccionar categoria</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          {/* Descripcion */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripcion</label>
            <textarea
              rows={4}
              value={form.descripcion}
              onChange={(e) => setForm({...form, descripcion: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] resize-none"
              placeholder="Describe el equipo, sus usos y caracteristicas principales..."
            />
          </div>

          {/* Marca y Modelo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
              <input
                type="text"
                value={form.marca}
                onChange={(e) => setForm({...form, marca: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                placeholder="Ej: CAT, Komatsu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
              <input
                type="text"
                value={form.modelo}
                onChange={(e) => setForm({...form, modelo: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                placeholder="Ej: 420F2"
              />
            </div>
          </div>

          {/* Capacidad y Codigo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Capacidad</label>
              <input
                type="text"
                value={form.capacidad}
                onChange={(e) => setForm({...form, capacidad: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                placeholder="Ej: 1.5 toneladas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Codigo interno</label>
              <input
                type="text"
                value={form.codigo_interno}
                onChange={(e) => setForm({...form, codigo_interno: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                placeholder="Ej: APE-001"
              />
            </div>
          </div>

          {/* Estado y Disponibilidad */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={form.estado}
                onChange={(e) => setForm({...form, estado: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656] bg-white"
              >
                <option value="disponible">Disponible</option>
                <option value="alquilado">Alquilado</option>
                <option value="mantenimiento">En mantenimiento</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio referencial</label>
              <input
                type="text"
                value={form.precio}
                onChange={(e) => setForm({...form, precio: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#115656]"
                placeholder="Ej: $150/dia"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.destacada}
                onChange={(e) => setForm({...form, destacada: e.target.checked})}
                className="w-4 h-4 accent-[#115656]"
              />
              <span className="text-sm text-gray-700">Equipo destacado</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.disponibilidad}
                onChange={(e) => setForm({...form, disponibilidad: e.target.checked})}
                className="w-4 h-4 accent-[#115656]"
              />
              <span className="text-sm text-gray-700">Disponible para alquiler</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <Link href="/admin/maquinaria" className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-lg font-medium text-center hover:bg-gray-50 transition-colors">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={cargando}
              className="flex-1 bg-[#115656] text-white py-3 rounded-lg font-bold hover:bg-[#0c3f3f] transition-colors disabled:opacity-50"
            >
              {cargando ? 'Guardando...' : 'Guardar maquinaria'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}