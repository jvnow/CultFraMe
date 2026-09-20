import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import Home from './pages/Home'
import Catalogo from './pages/catalogo'
import Obra from './pages/Obra'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App