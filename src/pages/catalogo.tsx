import { useMemo, useState } from 'react'

import Header from '../components/Header'
import ObraCard from '../components/ObraCard'

import { obras } from '../data/obras'

function Catalogo() {
  const [categoria, setCategoria] = useState('Todas')
  const [busca, setBusca] = useState('')
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
    ordenacao
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

            <span>
              {obrasFiltradas.length === 1
                ? 'obra encontrada'
                : 'obras encontradas'}
            </span>
          </div>

        </div>

        {/* PESQUISA */}

        <div className="catalogo-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Pesquisar no catálogo..."
            value={busca}
            onChange={(event) => {
              setBusca(event.target.value)
              setQuantidadeExibida(12)
            }}
          />

        </div>

        {/* FILTROS */}

        <div className="catalogo-filtros">

          <div className="catalogo-categorias">

            <button
              className={
                categoria === 'Todas'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Todas')
                setQuantidadeExibida(12)
              }}
            >
              Todas
            </button>

            <button
              className={
                categoria === 'Filme'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Filme')
                setQuantidadeExibida(12)
              }}
            >
              Filmes
            </button>

            <button
              className={
                categoria === 'Serie'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Serie')
                setQuantidadeExibida(12)
              }}
            >
              Séries
            </button>

            <button
              className={
                categoria === 'Anime'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Anime')
                setQuantidadeExibida(12)
              }}
            >
              Animes
            </button>

            <button
              className={
                categoria === 'Jogo'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Jogo')
                setQuantidadeExibida(12)
              }}
            >
              Jogos
            </button>

            <button
              className={
                categoria === 'Livro'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Livro')
                setQuantidadeExibida(12)
              }}
            >
              Livros
            </button>

            <button
              className={
                categoria === 'Manga'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Manga')
                setQuantidadeExibida(12)
              }}
            >
              Mangás/HQs
            </button>

            <button
              className={
                categoria === 'Musica'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Musica')
                setQuantidadeExibida(12)
              }}
            >
              Músicas
            </button>

            <button
              className={
                categoria === 'Podcast'
                  ? 'ativo'
                  : ''
              }
              onClick={() => {
                setCategoria('Podcast')
                setQuantidadeExibida(12)
              }}
            >
              Podcasts
            </button>

            <button
              className={
                categoria === 'Evento'
                  ? 'ativo'
                  : ''
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
              className="catalogo-limpar"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>

          </div>

        </div>

        {/* RESULTADOS */}

        <div className="catalogo-resultados">

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

            <div className="catalogo-grid">

              {obrasExibidas.map((obra) => (
                <ObraCard
                  key={obra.id}
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
                  onClick={mostrarMais}
                >
                  Ver mais
                </button>

              </div>

            )}

          </>

        ) : (

          /* NENHUM RESULTADO */

          <div className="catalogo-vazio">

            <span>🔎</span>

            <h2>
              Nenhuma obra encontrada
            </h2>

            <p>
              Tente pesquisar outro título
              ou remover alguns filtros.
            </p>

            <button
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