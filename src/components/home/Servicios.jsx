import { Shovel, Layers, Building2, Zap, Settings, BatteryCharging } from 'lucide-react'

export default function Servicios() {
  const servicios = [
    { icono: Shovel, titulo: "Excavacion", desc: "Retroexcavadoras y minicargadores para todo tipo de proyecto." },
    { icono: Layers, titulo: "Compactacion", desc: "Rodos y bailarinas para compactacion de suelos y pavimentos." },
    { icono: Building2, titulo: "Concreto", desc: "Concreteras y vibradores para trabajos de construccion." },
    { icono: Zap, titulo: "Herramientas Electricas", desc: "Sierras, pulidoras, perforadoras y cortadoras industriales." },
    { icono: Settings, titulo: "Equipos Industriales", desc: "Maquinaria especializada para proyectos industriales." },
    { icono: BatteryCharging, titulo: "Generadores", desc: "Generadores electricos para obra y uso industrial." },
  ]
  return (
    <section className="py-20 px-4 bg-[#f0f0f0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#115656]">Nuestros Servicios</h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Contamos con una amplia variedad de maquinaria para tu proyecto.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicios.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col gap-4">
              <div className="bg-[#115656] w-12 h-12 rounded-lg flex items-center justify-center">
                <s.icono size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#115656]">{s.titulo}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

