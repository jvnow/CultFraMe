import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Home from './pages/Home'
import Catalogo from './pages/catalogo'
import Obra from './pages/Obra'
import Biblioteca from './pages/Biblioteca'

function App() {
  return (
    <BrowserRouter basename="/CultFraMe">
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/catalogo"
          element={<Catalogo />}
        />

        <Route
          path="/obra/:id"
          element={<Obra />}
        />

        <Route
          path="/biblioteca"
          element={<Biblioteca />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App