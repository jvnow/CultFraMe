import Header from '../components/Header'
import SectionObras from '../components/SectionObras'

import { obras, filmes, animes } from '../data/obras'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
function handleVerMais() {
  navigate('/catalogo')
}
  return (
    <main>
      <Header />

  <SectionObras
  titulo="Popular on CultFraMe"
  obras={obras}
  limite={6}
  onVerMais={handleVerMais}
/>

      <SectionObras
  titulo="Mais bem avaliados"
  obras={filmes}
  limite={6}
/>

      <SectionObras
  titulo="Animes"
  obras={animes}
  limite={6}
/>
    </main>
  )
}

export default Home