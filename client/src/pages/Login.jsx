import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError(error.message || 'שגיאה בהתחברות');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-primary-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl">
            כ
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          התחברות למערכת
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          או{' '}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            הרשמה חדשה
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card py-8 px-4 shadow sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="form-label">
                כתובת אימייל
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="הכנס את כתובת האימייל שלך"
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                סיסמה
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="הכנס את הסיסמה שלך"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex justify-center items-center"
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  'התחבר'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">משתמשים לדוגמה</span>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <p><strong>משתמש רגיל:</strong> ron@example.com / Aa123456!</p>
              <p><strong>משתמש עסקי:</strong> sara@business.com / Aa123456!</p>
              <p><strong>אדמין:</strong> admin@system.com / Aa123456!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
