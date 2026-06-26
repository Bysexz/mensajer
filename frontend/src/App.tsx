import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Rutas protegidas (por ahora sin validación real) */}
        <Route path="/app" element={<MainLayout />}>
          {/* Aquí irán las rutas hijas del layout principal en el futuro */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
