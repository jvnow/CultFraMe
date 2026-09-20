import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

function Header() {
  const [busca, setBusca] = useState('')
  const navigate = useNavigate()

  function pesquisar() {
    const buscaFormatada = busca.trim()

    if (buscaFormatada === '') {
      navigate('/catalogo')
      return
    }

    navigate(
      `/catalogo?busca=${encodeURIComponent(buscaFormatada)}`
    )
  }

  function lidarComTecla(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === 'Enter') {
      pesquisar()
    }
  }

  return (
    <header className="site-header">
      <Link
        to="/"
        className="site-logo"
      >
        CultFraMe
      </Link>

      <nav className="site-nav">
        <Link to="/">Início</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/biblioteca">Biblioteca</Link>
      </nav>

      <input
        type="text"
        placeholder="Pesquisar..."
        value={busca}
        onChange={(event) =>
          setBusca(event.target.value)
        }
        onKeyDown={lidarComTecla}
      />
    </header>
  )
}

export default Header