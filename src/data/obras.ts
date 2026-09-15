import Akira from '../assets/Akira.jpg'
import bleach from '../assets/bleach.jpg'
import clubeDaLuta from '../assets/clubeDaLuta.jpg'
import deathNote from '../assets/deathNote.jpg'
import dialogos from '../assets/dialogos.jpg'
import dune from '../assets/dune.jpg'
import evangelion from '../assets/evangelion.jpg'
import friends from '../assets/friends.jpg'
import goodfellas from '../assets/goodfellas.jpg'
import jujutsuKaisen from '../assets/jujutsuKaisen.jpg'
import keke from '../assets/keke.png'
import killBill from '../assets/killBill.jpg'
import livro from '../assets/livro.png'
import narutoShippuden from '../assets/narutoShippuden.jpg'
import odisseia from '../assets/odisseia.jpg'
import podpah from '../assets/podpah.jpg'
import pulpFiction from '../assets/pulpFiction.jpg'
import rock from '../assets/rock.jpg'
import shadowOfColossus from '../assets/shadow-of-colossus.jpg'
import slamDunk from '../assets/slamDunk.jpg'
import unveranoSinTi from '../assets/Unveranosinti.jpg'
import vagabond from '../assets/vagabond.jpg'
import vampire from '../assets/vampire.jpg'

import type { Obra } from '../types/obra'

export const obras: Obra[] = [
  // FILMES
  {
    id: 1,
    titulo: 'Clube da Luta',
    tipo: 'Filme',
    imagem: clubeDaLuta,
    nota: 4.7
  },
  {
    id: 2,
    titulo: 'Dune',
    tipo: 'Filme',
    imagem: dune,
    nota: 4.6
  },
  {
    id: 3,
    titulo: 'Goodfellas',
    tipo: 'Filme',
    imagem: goodfellas,
    nota: 4.8
  },
  {
    id: 4,
    titulo: 'Kill Bill',
    tipo: 'Filme',
    imagem: killBill,
    nota: 4.7
  },
  {
    id: 5,
    titulo: 'Odisseia',
    tipo: 'Filme',
    imagem: odisseia,
    nota: 4.8
  },
  {
    id: 6,
    titulo: 'Pulp Fiction',
    tipo: 'Filme',
    imagem: pulpFiction,
    nota: 4.9
  },

  // SÉRIES
  {
    id: 7,
    titulo: 'Friends',
    tipo: 'Serie',
    imagem: friends,
    nota: 4.8
  },
  {
    id: 8,
    titulo: 'The Vampire Diaries',
    tipo: 'Serie',
    imagem: vampire,
    nota: 4.6
  },

  // ANIMES
  {
    id: 9,
    titulo: 'Akira',
    tipo: 'Anime',
    imagem: Akira,
    nota: 4.9
  },
  {
    id: 10,
    titulo: 'Bleach',
    tipo: 'Anime',
    imagem: bleach,
    nota: 4.8
  },
  {
    id: 11,
    titulo: 'Death Note',
    tipo: 'Anime',
    imagem: deathNote,
    nota: 4.9
  },
  {
    id: 12,
    titulo: 'Evangelion',
    tipo: 'Anime',
    imagem: evangelion,
    nota: 4.8
  },
  {
    id: 13,
    titulo: 'Jujutsu Kaisen',
    tipo: 'Anime',
    imagem: jujutsuKaisen,
    nota: 4.7
  },
  {
    id: 14,
    titulo: 'Naruto Shippuden',
    tipo: 'Anime',
    imagem: narutoShippuden,
    nota: 4.8
  },
  {
    id: 15,
    titulo: 'Slam Dunk',
    tipo: 'Anime',
    imagem: slamDunk,
    nota: 4.7
  },

  // LIVROS
  {
    id: 16,
    titulo: 'Diálogos',
    tipo: 'Livro',
    imagem: dialogos,
    nota: 4.5
  },
  {
    id: 17,
    titulo: 'A Sutil Arte de Ligar o F*da-se',
    tipo: 'Livro',
    imagem: livro,
    nota: 4.4
  },

  // JOGOS
  {
    id: 18,
    titulo: 'Shadow of the Colossus',
    tipo: 'Jogo',
    imagem: shadowOfColossus,
    nota: 4.9
  },

  // MANGÁS / HQs
  {
    id: 19,
    titulo: 'Vagabond',
    tipo: 'Manga',
    imagem: vagabond,
    nota: 4.9
  },

  // MÚSICAS
  {
    id: 20,
    titulo: 'Un Verano Sin Ti',
    tipo: 'Musica',
    imagem: unveranoSinTi,
    nota: 4.8
  },
  {
    id: 21,
    titulo: 'Keke',
    tipo: 'Musica',
    imagem: keke,
    nota: 4.6
  },

  // PODCASTS
  {
    id: 22,
    titulo: 'Podpah',
    tipo: 'Podcast',
    imagem: podpah,
    nota: 4.7
  },

  // EVENTOS
  {
    id: 23,
    titulo: 'Rock in Rio',
    tipo: 'Evento',
    imagem: rock,
    nota: 4.8
  }
]

// FILTROS POR CATEGORIA

export const filmes = obras.filter(
  (obra) => obra.tipo === 'Filme'
)

export const series = obras.filter(
  (obra) => obra.tipo === 'Serie'
)

export const animes = obras.filter(
  (obra) => obra.tipo === 'Anime'
)

export const jogos = obras.filter(
  (obra) => obra.tipo === 'Jogo'
)

export const livros = obras.filter(
  (obra) => obra.tipo === 'Livro'
)

export const mangas = obras.filter(
  (obra) => obra.tipo === 'Manga'
)

export const musicas = obras.filter(
  (obra) => obra.tipo === 'Musica'
)

export const podcasts = obras.filter(
  (obra) => obra.tipo === 'Podcast'
)

export const eventos = obras.filter(
  (obra) => obra.tipo === 'Evento'
)