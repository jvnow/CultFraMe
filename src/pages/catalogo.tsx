import { useState } from 'react'

import Header from '../components/Header'
import SectionObras from '../components/SectionObras'

import { obras } from '../data/obras'

function Catalogo() {
  const [categoria, setCategoria] = useState('Todas')

  let obrasFiltradas = obras

  if (categoria !== 'Todas') {
    obrasFiltradas = obras.filter(
      (obra) => obra.tipo === categoria
    )
  }

  return (
    <main>
      <Header />

      <div className="catalogo-filtros">
        <button
          className={categoria === 'Todas' ? 'ativo' : ''}
          onClick={() => setCategoria('Todas')}
        >
          Todas
        </button>

        <button
          className={categoria === 'Filme' ? 'ativo' : ''}
          onClick={() => setCategoria('Filme')}
        >
          Filmes
        </button>

        <button
          className={categoria === 'Serie' ? 'ativo' : ''}
          onClick={() => setCategoria('Serie')}
        >
          Séries
        </button>

        <button
          className={categoria === 'Anime' ? 'ativo' : ''}
          onClick={() => setCategoria('Anime')}
        >
          Animes
        </button>

        <button
          className={categoria === 'Jogo' ? 'ativo' : ''}
          onClick={() => setCategoria('Jogo')}
        >
          Jogos
        </button>

        <button
          className={categoria === 'Livro' ? 'ativo' : ''}
          onClick={() => setCategoria('Livro')}
        >
          Livros
        </button>

        <button
          className={categoria === 'Manga' ? 'ativo' : ''}
          onClick={() => setCategoria('Manga')}
        >
          Mangás/HQs
        </button>

        <button
          className={categoria === 'Musica' ? 'ativo' : ''}
          onClick={() => setCategoria('Musica')}
        >
          Músicas
        </button>

        <button
          className={categoria === 'Podcast' ? 'ativo' : ''}
          onClick={() => setCategoria('Podcast')}
        >
          Podcasts
        </button>

        <button
          className={categoria === 'Evento' ? 'ativo' : ''}
          onClick={() => setCategoria('Evento')}
        >
          Eventos
        </button>
      </div>

      <SectionObras
        titulo="Catálogo"
        obras={obrasFiltradas}
      />
    </main>
  )
}

export default Catalogo