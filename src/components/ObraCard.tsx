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
    >
      <div className="obra-card">
        <div className="obra-image">
          <img src={imagem} alt={titulo} />

          <div className="obra-overlay">
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
