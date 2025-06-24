import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layouts/app-layout';
import AuthLayout from './components/layouts/auth-layout';
import Login from './pages/auth/login/login';
import Register from './pages/auth/register/register';
import Dashboard from './pages/panel/dashboard/dashboard';
import VehiclesPage from './pages/panel/vehicles/vehicles';
import PrivateRoute from './routes/private-route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Route>
        <Route element={<AppLayout />}>
          <Route
            path="/panel/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/panel/vehicles"
            element={
              <PrivateRoute>
                <VehiclesPage />
              </PrivateRoute>
            }
          />
          {/* Opcional: ruta 404 */}
          <Route path="*" element={
            <PrivateRoute>
              <Navigate to="/panel/dashboard" replace />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;