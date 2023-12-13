import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { CalendarPage } from '../calendar';


export const AppRouter = () => {
  const authStatus = 'authenticated';

  return (
    <Routes>
      {authStatus === 'not-authenticated' ? (
        <>
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
        </>
      ) : (
        <Route path='/*' element={<CalendarPage />} />
      )}

      {/* Redirige a la página de inicio de sesión si no está autenticado */}
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};
