import { Clock, ShieldCheck, BadgeDollarSign, HeadphonesIcon } from 'lucide-react'

export default function Ventajas() {
  const ventajas = [
    { icono: Clock, titulo: "Atencion rapida", desc: "Respondemos tu solicitud en el menor tiempo posible." },
    { icono: ShieldCheck, titulo: "Equipos confiables", desc: "Maquinaria en optimas condiciones para tu proyecto." },
    { icono: BadgeDollarSign, titulo: "Precios competitivos", desc: "Las mejores tarifas del mercado salvadoreno." },
    { icono: HeadphonesIcon, titulo: "Asesoria especializada", desc: "Te ayudamos a elegir el equipo correcto para tu necesidad." },
  ]
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#115656]">Por que elegirnos</h2>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">Somos tu mejor aliado para el alquiler de maquinaria en El Salvador.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ventajas.map((v, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-[#f0f0f0] flex flex-col items-center gap-4">
              <div className="bg-[#115656] w-14 h-14 rounded-full flex items-center justify-center">
                <v.icono size={28} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#115656]">{v.titulo}</h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}