import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './AuthStyles.css';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const registerFormFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

export const RegisterPage = () => {

  const {startRegister, errorMessage} = useAuthStore();

  const {registerName,registerEmail, registerPassword,registerPassword2, onInputChange:onRegisterInputChange} = useForm(registerFormFields);

  const registerSubmit = (e) => {
    
    e.preventDefault();
    if(registerPassword !== registerPassword2){
      
      Swal.fire('Error en registro ', 'Las contraseñas no coinciden.', 'error');
      return;
    }
    if (registerPassword.length < 6) {
      
      Swal.fire('Error en registro ', 'La contraseña debe tener al menos 6 caracteres.', 'error');
      return;
    }
    startRegister({ name:registerName,email:registerEmail,password:registerPassword});
  }

  

  return (
    <div className='spec'>
      
      <form 
        className="form"
        onSubmit={registerSubmit}  
      >
       <p className="form-title">Register your account</p>
        <div className="input-container">
          <input 
            placeholder="Enter your name" 
            type="name"
            name='registerName'
            value={registerName}
            onChange={onRegisterInputChange}
          />
          
      </div>
        <div className="input-container">
          <input 
            placeholder="Enter your email" 
            type="email"
            name='registerEmail'
            value={registerEmail}
            onChange={onRegisterInputChange}
          />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
      </div>
      <div className="input-container">
          <input 
            placeholder="Enter password (Greater than 6 digits)" 
            type="password"
            name='registerPassword'
            value={registerPassword}
            onChange={onRegisterInputChange}
          />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
          
      </div>
      <div className="input-container">
          <input 
            placeholder="Repite your password" 
            type="password"
            name='registerPassword2'
            value={registerPassword2}
            onChange={onRegisterInputChange}
            />
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
         
      </div>
         <button className="submit" type="submit">
            Register
          </button>

      <p className="signup-link">
        Already had an account?
        <Link to='/auth/login'>Login up</Link>
      </p>
      </form>
    </div>
        
  )
}
