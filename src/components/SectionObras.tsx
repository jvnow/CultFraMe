import ObraCard from './ObraCard'

interface Obra {
  id: number
  titulo: string
  tipo: string
  imagem: string
  nota: number
}

interface SectionObrasProps {
  titulo: string
  obras: Obra[]
  limite?: number
  onVerMais?: () => void
}

function SectionObras({
  titulo,
  obras,
  limite,
  onVerMais,
}: SectionObrasProps) {
  const obrasExibidas = limite
    ? obras.slice(0, limite)
    : obras

  return (
    <section>
      <div className="section-header">
        <h2>{titulo}</h2>

        {onVerMais && (
          <button onClick={onVerMais}>
            Ver mais
          </button>
        )}
      </div>

      <div className="section-line"></div>

      <div className="cards-container">
        {obrasExibidas.map((obra) => (
          <ObraCard
            key={obra.id}
            id={obra.id}
            titulo={obra.titulo}
            tipo={obra.tipo}
            imagem={obra.imagem}
            nota={obra.nota}
          />
        ))}
      </div>
    </section>
  )
}

export default SectionObras
