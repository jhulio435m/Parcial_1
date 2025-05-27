import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'admin' | 'waiter'>('customer');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;
    
    if (!email) {
      errors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Correo electrónico inválido';
      isValid = false;
    }
    
    if (!password) {
      errors.password = 'La contraseña es requerida';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await login(email, password, role);
        navigate('/');
      } catch (err) {
        // Error is handled by the auth context
      }
    }
  };
  
  return (
    <Card className="max-w-md mx-auto animate-slide-up">
      <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 text-center">
        Bienvenido de nuevo
      </h2>
      
      {error && (
        <div className="bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ingresar como
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                role === 'customer'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cliente
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                role === 'admin'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole('waiter')}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                role === 'waiter'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mesero
            </button>
          </div>
        </div>
        
        <Input
          label="Correo Electrónico"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          error={formErrors.email}
        />
        
        <Input
          label="Contraseña"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={formErrors.password}
        />
        
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            className="text-sm text-primary-500 hover:text-primary-600"
            onClick={() => navigate('/forgot-password')}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </Button>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              className="text-primary-500 hover:text-primary-600 font-medium"
              onClick={() => navigate('/register')}
            >
              Regístrate
            </button>
          </p>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;