import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChefHat, Menu, X } from 'lucide-react';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-display font-semibold text-gray-900">
                Fine Dining
              </span>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700"
            >
              Inicio
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/menu')}
              className="text-gray-700"
            >
              Menú
            </Button>

            {user ? (
              <>
                {user.isWaiter ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/waiter')}
                    className="text-gray-700"
                  >
                    Panel de Mesero
                  </Button>
                ) : user.isAdmin ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/admin')}
                    className="text-gray-700"
                  >
                    Panel de Admin
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/reservations')}
                    className="text-gray-700"
                  >
                    Mis Reservas
                  </Button>
                )}
                
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="text-gray-700"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white pb-3 px-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            <Button
              variant="outline"
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="w-full text-left"
            >
              Inicio
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                navigate('/menu');
                setIsMenuOpen(false);
              }}
              className="w-full text-left"
            >
              Menú
            </Button>

            {user ? (
              <>
                {user.isWaiter ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/waiter');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left"
                  >
                    Panel de Mesero
                  </Button>
                ) : user.isAdmin ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/admin');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left"
                  >
                    Panel de Admin
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/reservations');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left"
                  >
                    Mis Reservas
                  </Button>
                )}
                
                <Button
                  variant="primary"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Registrarse
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;