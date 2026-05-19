export default function Hero() {
  return (
    <section className="bg-[#115656] text-white py-24 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl">
          Maquinaria confiable para tu proyecto
        </h1>
        <p className="text-green-200 text-lg max-w-2xl">
          Equipos funcionales, precios competitivos y asesoria especializada.
        </p>
        <div className="flex gap-4">
          <a href="/catalogo" className="bg-white text-[#115656] px-8 py-4 rounded-lg font-bold">Ver Catalogo</a>
          <a href="https://wa.me/50300000000" target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold">Cotizar ahora</a>
        </div>
      </div>
    </section>
  )
}