import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import FinanciamentoPage from './pages/FinanciamentoPage'
import ObrasPage from './pages/ObrasPage'
import AprendaPage from './pages/AprendaPage'
import PortalLoginPage from './pages/portal/PortalLoginPage'
import ClientDashboardPage from './pages/portal/ClientDashboardPage'
import AdminDashboardPage from './pages/portal/AdminDashboardPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="financiamento" element={<FinanciamentoPage />} />
          <Route path="obras" element={<ObrasPage />} />
          <Route path="aprenda" element={<AprendaPage />} />
          <Route path="portal" element={<PortalLoginPage />} />
          <Route path="portal/painel" element={<ClientDashboardPage />} />
          <Route path="portal/admin" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
