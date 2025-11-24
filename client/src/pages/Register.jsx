import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: {
      first: '',
      middle: '',
      last: ''
    },
    phone: '',
    email: '',
    password: '',
    image: {
      url: '',
      alt: ''
    },
    address: {
      state: '',
      country: 'ישראל',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    },
    isBusiness: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert houseNumber to number
      const submitData = {
        ...formData,
        address: {
          ...formData.address,
          houseNumber: parseInt(formData.address.houseNumber),
          zip: formData.address.zip ? parseInt(formData.address.zip) : undefined
        }
      };

      await register(submitData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'שגיאה ברישום');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl">
              כ
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            הרשמה למערכת
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            כבר יש לך חשבון?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              התחבר כאן
            </Link>
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">פרטים אישיים</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="name.first" className="form-label">
                    שם פרטי *
                  </label>
                  <input
                    id="name.first"
                    name="name.first"
                    type="text"
                    required
                    className="form-input"
                    value={formData.name.first}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="name.middle" className="form-label">
                    שם אמצעי
                  </label>
                  <input
                    id="name.middle"
                    name="name.middle"
                    type="text"
                    className="form-input"
                    value={formData.name.middle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="name.last" className="form-label">
                    שם משפחה *
                  </label>
                  <input
                    id="name.last"
                    name="name.last"
                    type="text"
                    required
                    className="form-input"
                    value={formData.name.last}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">פרטי קשר</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="form-label">
                    כתובת אימייל *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="form-label">
                    מספר טלפון *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="050-1234567"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label">
                סיסמה *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="לפחות 7 תווים עם אות גדולה, קטנה, מספר וסימן מיוחד"
              />
            </div>

            {/* Address */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">כתובת</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address.country" className="form-label">
                    מדינה *
                  </label>
                  <input
                    id="address.country"
                    name="address.country"
                    type="text"
                    required
                    className="form-input"
                    value={formData.address.country}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="address.city" className="form-label">
                    עיר *
                  </label>
                  <input
                    id="address.city"
                    name="address.city"
                    type="text"
                    required
                    className="form-input"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="address.street" className="form-label">
                    רחוב *
                  </label>
                  <input
                    id="address.street"
                    name="address.street"
                    type="text"
                    required
                    className="form-input"
                    value={formData.address.street}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="address.houseNumber" className="form-label">
                    מספר בית *
                  </label>
                  <input
                    id="address.houseNumber"
                    name="address.houseNumber"
                    type="number"
                    required
                    className="form-input"
                    value={formData.address.houseNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Business Account */}
            <div>
              <div className="flex items-center">
                <input
                  id="isBusiness"
                  name="isBusiness"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  checked={formData.isBusiness}
                  onChange={handleChange}
                />
                <label htmlFor="isBusiness" className="mr-2 block text-sm text-gray-900">
                  חשבון עסקי (יאפשר יצירת כרטיסי ביקור)
                </label>
              </div>
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
                  'הרשמה'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
