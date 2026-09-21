import { useState } from 'react'
import {
  Link,
  useParams,
} from 'react-router-dom'

import Header from '../components/Header'

import { obras } from '../data/obras'

type StatusBiblioteca =
  | 'quero'
  | 'vendo'
  | 'concluido'

interface ItemBiblioteca {
  obraId: number
  status: StatusBiblioteca
}

const CHAVE_BIBLIOTECA =
  'cultframe-biblioteca'

function Obra() {
  const { id } = useParams()

  const [mostrarStatus, setMostrarStatus] =
    useState(false)

  const [
    mensagemBiblioteca,
    setMensagemBiblioteca,
  ] = useState('')

  const obra = obras.find(
    (item) => item.id === Number(id)
  )

  function adicionarBiblioteca(
    status: StatusBiblioteca
  ) {
    if (!obra) {
      return
    }

    const bibliotecaSalva =
      localStorage.getItem(
        CHAVE_BIBLIOTECA
      )

    let biblioteca: ItemBiblioteca[] = []

    if (bibliotecaSalva) {
      try {
        biblioteca =
          JSON.parse(
            bibliotecaSalva
          ) as ItemBiblioteca[]
      } catch {
        biblioteca = []
      }
    }

    const obraJaExiste =
      biblioteca.some(
        (item) =>
          item.obraId === obra.id
      )

    if (obraJaExiste) {
      biblioteca =
        biblioteca.map((item) =>
          item.obraId === obra.id
            ? {
                ...item,
                status,
              }
            : item
        )
    } else {
      biblioteca.push({
        obraId: obra.id,
        status,
      })
    }

    localStorage.setItem(
      CHAVE_BIBLIOTECA,
      JSON.stringify(biblioteca)
    )

    setMostrarStatus(false)

    setMensagemBiblioteca(
      'Obra adicionada à biblioteca!'
    )

    setTimeout(() => {
      setMensagemBiblioteca('')
    }, 2500)
  }

  if (!obra) {
    return (
      <main className="obra-page">
        <Header />

        <div
          className="obra-nao-encontrada"
          role="status"
        >
          <h1>Obra não encontrada</h1>

          <p>
            Não encontramos a obra que você está
            procurando.
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
              alt={`Capa de ${obra.titulo}`}
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

            <div
              className="obra-detalhes-nota"
              aria-label={`Nota ${obra.nota} de 5`}
            >
              <span aria-hidden="true">
                ★
              </span>

              <strong>
                {obra.nota}
              </strong>

              <small>/ 5</small>
            </div>

            <p className="obra-detalhes-descricao">
              Descubra, avalie e compartilhe sua
              experiência com esta obra no CultFraMe.
            </p>

            <div className="obra-detalhes-acoes">
              <button
                type="button"
                aria-expanded={
                  mostrarStatus
                }
                aria-controls="obra-status-menu"
                onClick={() =>
                  setMostrarStatus(
                    !mostrarStatus
                  )
                }
              >
                + Adicionar à biblioteca
              </button>

              <button
                type="button"
              >
                ★ Avaliar
              </button>
            </div>

            {mostrarStatus && (
              <div
                id="obra-status-menu"
                className="obra-status-menu"
                aria-label="Escolher status da biblioteca"
              >
                <span>
                  Adicionar como:
                </span>

                <button
                  type="button"
                  onClick={() =>
                    adicionarBiblioteca(
                      'quero'
                    )
                  }
                >
                  Quero ver
                </button>

                <button
                  type="button"
                  onClick={() =>
                    adicionarBiblioteca(
                      'vendo'
                    )
                  }
                >
                  Vendo
                </button>

                <button
                  type="button"
                  onClick={() =>
                    adicionarBiblioteca(
                      'concluido'
                    )
                  }
                >
                  Concluído
                </button>
              </div>
            )}

            {mensagemBiblioteca && (
              <p
                className="obra-mensagem"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                ✓ {mensagemBiblioteca}
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Obra
