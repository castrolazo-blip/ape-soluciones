export default function ContactoRapido() {
  return (
    <section className="py-20 px-4 bg-[#115656] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">Contactanos ahora</h2>
          <p className="text-green-200 mt-4 text-lg max-w-2xl mx-auto">Estamos listos para ayudarte a encontrar el equipo ideal para tu proyecto.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <a href="https://wa.me/50300000000" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
            <p className="text-green-200 text-sm">Respuesta inmediata</p>
          </a>
          <a href="tel:+50300000000" className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📞</div>
            <h3 className="font-bold text-lg mb-1">Telefono</h3>
            <p className="text-green-200 text-sm">+503 0000-0000</p>
          </a>
          <a href="mailto:info@apesoluciones.com" className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">📧</div>
            <h3 className="font-bold text-lg mb-1">Correo</h3>
            <p className="text-green-200 text-sm">info@apesoluciones.com</p>
          </a>
        </div>
        <div className="text-center">
          <a href="/contacto" className="bg-white text-[#115656] px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors inline-block">
            Solicitar cotizacion
          </a>
        </div>
      </div>
    </section>
  )
}