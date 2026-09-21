import { useEffect, useState } from 'react'

import Header from '../components/Header'
import ObraCard from '../components/ObraCard'
import { obras } from '../data/obras'

type StatusBiblioteca =
  | 'quero'
  | 'vendo'
  | 'concluido'

interface ItemBiblioteca {
  obraId: number
  status: StatusBiblioteca
}

const CHAVE_BIBLIOTECA = 'cultframe-biblioteca'

function Biblioteca() {
  const [biblioteca, setBiblioteca] = useState<
    ItemBiblioteca[]
  >([])

  const [filtro, setFiltro] = useState<
    'todos' | StatusBiblioteca
  >('todos')

  useEffect(() => {
    const bibliotecaSalva =
      localStorage.getItem(CHAVE_BIBLIOTECA)

    if (!bibliotecaSalva) {
      return
    }

    try {
      const dadosSalvos = JSON.parse(
        bibliotecaSalva
      ) as ItemBiblioteca[]

      setBiblioteca(dadosSalvos)
    } catch {
      localStorage.removeItem(
        CHAVE_BIBLIOTECA
      )
    }
  }, [])

  function atualizarBiblioteca(
    novaBiblioteca: ItemBiblioteca[]
  ) {
    setBiblioteca(novaBiblioteca)

    localStorage.setItem(
      CHAVE_BIBLIOTECA,
      JSON.stringify(novaBiblioteca)
    )
  }

  function removerDaBiblioteca(
    obraId: number
  ) {
    const novaBiblioteca =
      biblioteca.filter(
        (item) => item.obraId !== obraId
      )

    atualizarBiblioteca(novaBiblioteca)
  }

  function alterarStatus(
    obraId: number,
    novoStatus: StatusBiblioteca
  ) {
    const novaBiblioteca =
      biblioteca.map((item) =>
        item.obraId === obraId
          ? {
              ...item,
              status: novoStatus,
            }
          : item
      )

    atualizarBiblioteca(novaBiblioteca)
  }

  const obrasDaBiblioteca = biblioteca
    .map((item) => {
      const obra = obras.find(
        (obraAtual) =>
          obraAtual.id === item.obraId
      )

      if (!obra) {
        return null
      }

      return {
        obra,
        status: item.status,
      }
    })
    .filter(
      (
        item
      ): item is {
        obra: (typeof obras)[number]
        status: StatusBiblioteca
      } => item !== null
    )

  const obrasFiltradas =
    filtro === 'todos'
      ? obrasDaBiblioteca
      : obrasDaBiblioteca.filter(
          (item) => item.status === filtro
        )

  const quantidadeTotal =
    biblioteca.length

  const quantidadeQuero =
    biblioteca.filter(
      (item) => item.status === 'quero'
    ).length

  const quantidadeVendo =
    biblioteca.filter(
      (item) => item.status === 'vendo'
    ).length

  const quantidadeConcluido =
    biblioteca.filter(
      (item) => item.status === 'concluido'
    ).length

  return (
    <main className="biblioteca-page">
      <Header />

      <div className="biblioteca-container">
        <div className="biblioteca-heading">
          <div>
            <span className="biblioteca-eyebrow">
              CULTFRAME
            </span>

            <h1>Minha biblioteca</h1>

            <p>
              Organize as obras que fazem parte
              da sua experiência cultural.
            </p>
          </div>

          <div className="biblioteca-total">
            <strong>{quantidadeTotal}</strong>

            <span
              aria-live="polite"
              aria-atomic="true"
            >
              {quantidadeTotal === 1
                ? 'obra salva'
                : 'obras salvas'}
            </span>
          </div>
        </div>

        <div
          className="biblioteca-estatisticas"
          role="group"
          aria-label="Filtrar biblioteca por status"
        >
          <button
            type="button"
            className={
              filtro === 'todos'
                ? 'ativo'
                : ''
            }
            aria-pressed={
              filtro === 'todos'
            }
            onClick={() =>
              setFiltro('todos')
            }
          >
            <strong>{quantidadeTotal}</strong>
            <span>Todos</span>
          </button>

          <button
            type="button"
            className={
              filtro === 'quero'
                ? 'ativo'
                : ''
            }
            aria-pressed={
              filtro === 'quero'
            }
            onClick={() =>
              setFiltro('quero')
            }
          >
            <strong>{quantidadeQuero}</strong>
            <span>Quero ver</span>
          </button>

          <button
            type="button"
            className={
              filtro === 'vendo'
                ? 'ativo'
                : ''
            }
            aria-pressed={
              filtro === 'vendo'
            }
            onClick={() =>
              setFiltro('vendo')
            }
          >
            <strong>{quantidadeVendo}</strong>
            <span>Vendo</span>
          </button>

          <button
            type="button"
            className={
              filtro === 'concluido'
                ? 'ativo'
                : ''
            }
            aria-pressed={
              filtro === 'concluido'
            }
            onClick={() =>
              setFiltro('concluido')
            }
          >
            <strong>
              {quantidadeConcluido}
            </strong>

            <span>Concluídos</span>
          </button>
        </div>

        {obrasFiltradas.length > 0 ? (
          <div
            className="biblioteca-grid"
            aria-live="polite"
            aria-atomic="true"
          >
            {obrasFiltradas.map(
              ({ obra, status }) => (
                <div
                  className="biblioteca-item"
                  key={obra.id}
                >
                  <ObraCard
                    id={obra.id}
                    titulo={obra.titulo}
                    tipo={obra.tipo}
                    imagem={obra.imagem}
                    nota={obra.nota}
                  />

                  <div className="biblioteca-controles">
                    <label
                      htmlFor={`status-${obra.id}`}
                      className="sr-only"
                    >
                      Status de {obra.titulo}
                    </label>

                    <select
                      id={`status-${obra.id}`}
                      value={status}
                      aria-label={`Status de ${obra.titulo}`}
                      onChange={(event) =>
                        alterarStatus(
                          obra.id,
                          event.target
                            .value as StatusBiblioteca
                        )
                      }
                    >
                      <option value="quero">
                        Quero ver
                      </option>

                      <option value="vendo">
                        Vendo
                      </option>

                      <option value="concluido">
                        Concluído
                      </option>
                    </select>

                    <button
                      type="button"
                      aria-label={`Remover ${obra.titulo} da biblioteca`}
                      onClick={() =>
                        removerDaBiblioteca(
                          obra.id
                        )
                      }
                    >
                      Remover
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div
            className="biblioteca-vazia"
            role="status"
          >
            <span aria-hidden="true">
              📚
            </span>

            <h2>
              {quantidadeTotal === 0
                ? 'Sua biblioteca está vazia'
                : 'Nenhuma obra nesta categoria'}
            </h2>

            <p>
              {quantidadeTotal === 0
                ? 'Explore o catálogo e adicione obras que você quer assistir, ler, jogar ou conhecer.'
                : 'Adicione ou mova obras para esta categoria para encontrá-las aqui.'}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default Biblioteca