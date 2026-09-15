interface ObraCardProps {
  titulo: string
  tipo: string
  imagem: string
  nota: number
}

function ObraCard({ titulo, tipo, imagem, nota}: ObraCardProps) {
  return (
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
  )
}

export default ObraCard