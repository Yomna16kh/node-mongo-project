import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'דף הבית', public: true, icon: '🏠' },
    { path: '/cards', label: 'כרטיסי ביקור', public: true, icon: '📇' },
    { path: '/my-cards', label: 'הכרטיסים שלי', auth: true, icon: '💼' },
    { path: '/create-card', label: 'יצירת כרטיס', business: true, icon: '✨' },
    { path: '/profile', label: 'פרופיל', auth: true, icon: '👤' },
    { path: '/users', label: 'ניהול משתמשים', admin: true, icon: '⚙️' }
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.public) return true;
    if (link.auth && user) return true;
    if (link.business && user?.isBusiness) return true;
    if (link.admin && user?.isAdmin) return true;
    return false;
  });

  return (
    <nav className="navbar-glass sticky top-0 z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse group">
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-glow group-hover:shadow-glow-lg transition-all duration-300 group-hover:scale-105">
              כ
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">כרטיסי ביקור</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            {filteredLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive(link.path)
                    ? 'bg-primary-100 text-primary-700 shadow-soft'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50'
                }`}
              >
                <span className="text-base">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-3 space-x-reverse bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-primary-200"
                    src={user.image?.url || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"}
                    alt={user.name?.first}
                  />
                  <span className="text-sm font-medium text-secondary-700">
                    שלום, {user.name?.first || user.email}
                  </span>
                  {user.isBusiness && (
                    <span className="badge badge-primary">עסקי</span>
                  )}
                  {user.isAdmin && (
                    <span className="badge badge-warning">אדמין</span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-secondary-600 hover:text-secondary-900 bg-white/60 backdrop-blur-sm hover:bg-white/80 px-4 py-2 rounded-xl transition-all duration-300 font-medium shadow-soft hover:shadow-medium"
                >
                  התנתק
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 space-x-reverse">
                <Link
                  to="/login"
                  className="text-sm text-secondary-600 hover:text-primary-600 px-4 py-2 rounded-xl transition-all duration-300 font-medium"
                >
                  התחבר
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  הרשמה
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-600 hover:text-primary-600 focus:outline-none focus:text-primary-600 p-2 rounded-xl hover:bg-primary-50/50 transition-all duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/20 pt-4 pb-4 animate-slide-down">
            <div className="space-y-2">
              {filteredLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-3 ${
                    isActive(link.path)
                      ? 'bg-primary-100 text-primary-700 shadow-soft'
                      : 'text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="px-4 py-3 text-sm text-secondary-600 bg-white/40 rounded-xl mb-2">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-8 w-8 rounded-full ring-2 ring-primary-200"
                        src={user.image?.url || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_960_720.png"}
                        alt={user.name?.first}
                      />
                      <div>
                        <div className="font-medium">שלום, {user.name?.first || user.email}</div>
                        <div className="flex gap-2 mt-1">
                          {user.isBusiness && <span className="badge badge-primary">עסקי</span>}
                          {user.isAdmin && <span className="badge badge-warning">אדמין</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-right px-4 py-3 text-sm text-secondary-600 hover:text-secondary-900 hover:bg-white/60 rounded-xl transition-all duration-300 font-medium"
                  >
                    התנתק
                  </button>
                </div>
              ) : (
                <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50/50 rounded-xl transition-all duration-300 font-medium"
                  >
                    התחבר
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-sm bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 font-semibold text-center"
                  >
                    הרשמה
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
