import { Link, useParams } from 'react-router-dom'

import Header from '../components/Header'
import { obras } from '../data/obras'

function Obra() {
  const { id } = useParams()

  const obra = obras.find(
    (item) => item.id === Number(id)
  )

  if (!obra) {
    return (
      <main className="obra-page">
        <Header />

        <div className="obra-nao-encontrada">
          <h1>Obra não encontrada</h1>

          <p>
            Não encontramos a obra que você está procurando.
          </p>

          <Link to="/catalogo">
            Voltar para o catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="obra-page">
      <Header />

      <div className="obra-container">

        <Link
          to="/catalogo"
          className="obra-voltar"
        >
          ← Voltar para o catálogo
        </Link>

        <div className="obra-detalhes">

          <div className="obra-detalhes-imagem">
            <img
              src={obra.imagem}
              alt={obra.titulo}
            />
          </div>

          <div className="obra-detalhes-info">

            <span className="obra-detalhes-tipo">
              {obra.tipo === 'Serie'
                ? 'Série'
                : obra.tipo === 'Manga'
                  ? 'Mangá / HQ'
                  : obra.tipo === 'Musica'
                    ? 'Música'
                    : obra.tipo}
            </span>

            <h1>{obra.titulo}</h1>

            <div className="obra-detalhes-nota">
              <span>★</span>
              <strong>{obra.nota}</strong>
              <small>/ 5</small>
            </div>

            <p className="obra-detalhes-descricao">
              Descubra, avalie e compartilhe sua
              experiência com esta obra no CultFraMe.
            </p>

            <div className="obra-detalhes-acoes">

              <button>
                + Adicionar à biblioteca
              </button>

              <button>
                ★ Avaliar
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  )
}

export default Obra