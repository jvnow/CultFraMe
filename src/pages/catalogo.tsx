import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Header from '../components/Header'
import ObraCard from '../components/ObraCard'
import { obras } from '../data/obras'

function Catalogo() {
  const [searchParams] = useSearchParams()

  const buscaInicial = searchParams.get('busca') ?? ''

  const [categoria, setCategoria] = useState('Todas')
  const [busca, setBusca] = useState(buscaInicial)
  const [notaMinima, setNotaMinima] = useState(0)
  const [ordenacao, setOrdenacao] = useState('padrao')
  const [quantidadeExibida, setQuantidadeExibida] = useState(12)

  const obrasFiltradas = useMemo(() => {
    const resultado = obras.filter((obra) => {
      const correspondeCategoria =
        categoria === 'Todas' ||
        obra.tipo === categoria

      const correspondeBusca =
        obra.titulo
          .toLowerCase()
          .includes(busca.toLowerCase())

      const correspondeNota =
        obra.nota >= notaMinima

      return (
        correspondeCategoria &&
        correspondeBusca &&
        correspondeNota
      )
    })

    const resultadoOrdenado = [...resultado]

    if (ordenacao === 'maiorNota') {
      resultadoOrdenado.sort(
        (a, b) => b.nota - a.nota
      )
    }

    if (ordenacao === 'menorNota') {
      resultadoOrdenado.sort(
        (a, b) => a.nota - b.nota
      )
    }

    if (ordenacao === 'az') {
      resultadoOrdenado.sort((a, b) =>
        a.titulo.localeCompare(b.titulo)
      )
    }

    if (ordenacao === 'za') {
      resultadoOrdenado.sort((a, b) =>
        b.titulo.localeCompare(a.titulo)
      )
    }

    return resultadoOrdenado
  }, [
    categoria,
    busca,
    notaMinima,
    ordenacao,
  ])

  const obrasExibidas =
    obrasFiltradas.slice(
      0,
      quantidadeExibida
    )

  const existemMaisObras =
    quantidadeExibida <
    obrasFiltradas.length

  function limparFiltros() {
    setCategoria('Todas')
    setBusca('')
    setNotaMinima(0)
    setOrdenacao('padrao')
    setQuantidadeExibida(12)
  }

  function mostrarMais() {
    setQuantidadeExibida(
      (quantidadeAtual) =>
        quantidadeAtual + 8
    )
  }

  return (
    <main className="catalogo-page">
      <Header />

      <div className="catalogo-container">
        {/* CABEÇALHO */}
        <div className="catalogo-heading">
          <div>
            <span className="catalogo-eyebrow">
              CULTFRAME
            </span>

            <h1>Catálogo</h1>

            <p>
              Explore filmes, séries, animes,
              músicas, livros, jogos e muito mais.
            </p>
          </div>

          <div className="catalogo-total">
            <strong>
              {obrasFiltradas.length}
            </strong>

            <span
              aria-live="polite"
              aria-atomic="true"
            >
              {obrasFiltradas.length === 1
                ? 'obra encontrada'
                : 'obras encontradas'}
            </span>
          </div>
        </div>

        {/* PESQUISA */}
        <div className="catalogo-search">
          <span aria-hidden="true">🔎</span>

          <label
            htmlFor="busca-catalogo"
            className="sr-only"
          >
            Pesquisar no catálogo
          </label>

          <input
            id="busca-catalogo"
            type="search"
            placeholder="Pesquisar no catálogo..."
            value={busca}
            aria-label="Pesquisar no catálogo"
            onChange={(event) => {
              setBusca(event.target.value)
              setQuantidadeExibida(12)
            }}
          />
        </div>

        {/* FILTROS */}
        <div className="catalogo-filtros">
          <div
            className="catalogo-categorias"
            role="group"
            aria-label="Filtrar por categoria"
          >
            <button
              type="button"
              className={
                categoria === 'Todas'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Todas'
              }
              onClick={() => {
                setCategoria('Todas')
                setQuantidadeExibida(12)
              }}
            >
              Todas
            </button>

            <button
              type="button"
              className={
                categoria === 'Filme'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Filme'
              }
              onClick={() => {
                setCategoria('Filme')
                setQuantidadeExibida(12)
              }}
            >
              Filmes
            </button>

            <button
              type="button"
              className={
                categoria === 'Serie'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Serie'
              }
              onClick={() => {
                setCategoria('Serie')
                setQuantidadeExibida(12)
              }}
            >
              Séries
            </button>

            <button
              type="button"
              className={
                categoria === 'Anime'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Anime'
              }
              onClick={() => {
                setCategoria('Anime')
                setQuantidadeExibida(12)
              }}
            >
              Animes
            </button>

            <button
              type="button"
              className={
                categoria === 'Jogo'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Jogo'
              }
              onClick={() => {
                setCategoria('Jogo')
                setQuantidadeExibida(12)
              }}
            >
              Jogos
            </button>

            <button
              type="button"
              className={
                categoria === 'Livro'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Livro'
              }
              onClick={() => {
                setCategoria('Livro')
                setQuantidadeExibida(12)
              }}
            >
              Livros
            </button>

            <button
              type="button"
              className={
                categoria === 'Manga'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Manga'
              }
              onClick={() => {
                setCategoria('Manga')
                setQuantidadeExibida(12)
              }}
            >
              Mangás/HQs
            </button>

            <button
              type="button"
              className={
                categoria === 'Musica'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Musica'
              }
              onClick={() => {
                setCategoria('Musica')
                setQuantidadeExibida(12)
              }}
            >
              Músicas
            </button>

            <button
              type="button"
              className={
                categoria === 'Podcast'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Podcast'
              }
              onClick={() => {
                setCategoria('Podcast')
                setQuantidadeExibida(12)
              }}
            >
              Podcasts
            </button>

            <button
              type="button"
              className={
                categoria === 'Evento'
                  ? 'ativo'
                  : ''
              }
              aria-pressed={
                categoria === 'Evento'
              }
              onClick={() => {
                setCategoria('Evento')
                setQuantidadeExibida(12)
              }}
            >
              Eventos
            </button>
          </div>

          {/* FILTROS SECUNDÁRIOS */}
          <div className="catalogo-filtros-secundarios">
            <div className="catalogo-filtro">
              <label htmlFor="nota">
                Nota mínima
              </label>

              <select
                id="nota"
                value={notaMinima}
                onChange={(event) => {
                  setNotaMinima(
                    Number(event.target.value)
                  )

                  setQuantidadeExibida(12)
                }}
              >
                <option value={0}>
                  Todas
                </option>

                <option value={3}>
                  3.0+
                </option>

                <option value={3.5}>
                  3.5+
                </option>

                <option value={4}>
                  4.0+
                </option>

                <option value={4.5}>
                  4.5+
                </option>
              </select>
            </div>

            <div className="catalogo-filtro">
              <label htmlFor="ordenacao">
                Ordenar
              </label>

              <select
                id="ordenacao"
                value={ordenacao}
                onChange={(event) => {
                  setOrdenacao(event.target.value)
                  setQuantidadeExibida(12)
                }}
              >
                <option value="padrao">
                  Padrão
                </option>

                <option value="maiorNota">
                  Maior nota
                </option>

                <option value="menorNota">
                  Menor nota
                </option>

                <option value="az">
                  A — Z
                </option>

                <option value="za">
                  Z — A
                </option>
              </select>
            </div>

            <button
              type="button"
              className="catalogo-limpar"
              aria-label="Limpar todos os filtros"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>
          </div>
        </div>

        {/* RESULTADOS */}
        <div
          className="catalogo-resultados"
          aria-live="polite"
          aria-atomic="true"
        >
          <div>
            <h2>
              {categoria === 'Todas'
                ? 'Todas as obras'
                : categoria === 'Serie'
                  ? 'Séries'
                  : categoria === 'Manga'
                    ? 'Mangás / HQs'
                    : categoria === 'Musica'
                      ? 'Músicas'
                      : `${categoria}s`}
            </h2>

            <span>
              {obrasFiltradas.length}{' '}
              {obrasFiltradas.length === 1
                ? 'resultado'
                : 'resultados'}
            </span>
          </div>
        </div>

        {/* CATÁLOGO */}
        {obrasFiltradas.length > 0 ? (
          <>
            <div
              className="catalogo-grid"
              aria-label="Resultados do catálogo"
            >
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

            {/* VER MAIS */}
            {existemMaisObras && (
              <div className="catalogo-ver-mais">
                <button
                  type="button"
                  aria-label="Mostrar mais obras"
                  onClick={mostrarMais}
                >
                  Ver mais
                </button>
              </div>
            )}
          </>
        ) : (
          /* NENHUM RESULTADO */
          <div
            className="catalogo-vazio"
            role="status"
          >
            <span aria-hidden="true">
              🔎
            </span>

            <h2>
              Nenhuma obra encontrada
            </h2>

            <p>
              Tente pesquisar outro título
              ou remover alguns filtros.
            </p>

            <button
              type="button"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default Catalogo