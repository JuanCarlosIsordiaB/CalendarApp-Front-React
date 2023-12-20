import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, RegisterPage } from '../auth';
import { CalendarPage } from '../calendar';
import { getEnvVariables } from '../helpers';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';


export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  //const authStatus = 'not-authenticated';

  useEffect(() => {
    checkAuthToken()
  
  }, [])
  

  if( status === 'checking'){
    return(
      <h3>Cargando...</h3>
    )
  }


  return (
    <Routes>
      {status === 'not-authenticated' ? (
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
