import { Link } from 'react-router-dom'

interface ObraCardProps {
  id: number
  titulo: string
  tipo: string
  imagem: string
  nota: number
}

function ObraCard({
  id,
  titulo,
  tipo,
  imagem,
  nota,
}: ObraCardProps) {
  return (
    <Link
      to={`/obra/${id}`}
      className="obra-card-link"
      aria-label={`${titulo}, ${tipo}, nota ${nota} de 5`}
    >
      <div className="obra-card">
        <div className="obra-image">
          <img
            src={imagem}
            alt={`Capa de ${titulo}`}
          />

          <div
            className="obra-overlay"
            aria-hidden="true"
          >
            <span>★ {nota}</span>
          </div>
        </div>

        <h3>{titulo}</h3>
        <p>{tipo}</p>
      </div>
    </Link>
  )
}

export default ObraCard