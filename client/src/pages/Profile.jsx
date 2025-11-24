import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: {
      first: '',
      middle: '',
      last: ''
    },
    phone: '',
    email: '',
    image: {
      url: '',
      alt: ''
    },
    address: {
      state: '',
      country: '',
      city: '',
      street: '',
      houseNumber: '',
      zip: ''
    }
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: {
          first: user.name?.first || '',
          middle: user.name?.middle || '',
          last: user.name?.last || ''
        },
        phone: user.phone || '',
        email: user.email || '',
        image: {
          url: user.image?.url || '',
          alt: user.image?.alt || ''
        },
        address: {
          state: user.address?.state || '',
          country: user.address?.country || '',
          city: user.address?.city || '',
          street: user.address?.street || '',
          houseNumber: user.address?.houseNumber || '',
          zip: user.address?.zip || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        address: {
          ...formData.address,
          houseNumber: parseInt(formData.address.houseNumber),
          zip: formData.address.zip ? parseInt(formData.address.zip) : undefined
        }
      };

      const response = await axios.put(`/users/${user._id}`, submitData);
      updateUser(response.data);
      setSuccess('הפרופיל עודכן בהצלחה');
    } catch (error) {
      setError(error.response?.data?.message || 'שגיאה בעדכון הפרופיל');
    } finally {
      setLoading(false);
    }
  };

  const toggleBusinessStatus = async () => {
    try {
      const response = await axios.patch(`/users/${user._id}`);
      updateUser(response.data);
      setSuccess(`הסטטוס שונה ל${response.data.isBusiness ? 'עסקי' : 'רגיל'}`);
    } catch (error) {
      setError('שגיאה בשינוי הסטטוס');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            פרופיל משתמש
          </h1>
          <p className="text-lg text-gray-600">
            עדכן את הפרטים האישיים שלך
          </p>
        </div>

        <div className="card p-8">
          {/* User Status */}
          <div className="mb-6 p-4 bg-primary-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">סטטוס חשבון</h3>
                <p className="text-sm text-gray-600">
                  {user?.isBusiness ? 'חשבון עסקי' : 'חשבון רגיל'}
                  {user?.isAdmin && ' • אדמין'}
                </p>
              </div>
              <button
                onClick={toggleBusinessStatus}
                className="btn-secondary text-sm"
              >
                {user?.isBusiness ? 'החלף לרגיל' : 'החלף לעסקי'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
                {success}
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
                  />
                </div>
              </div>
            </div>

            {/* Image */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">תמונת פרופיל</h3>
              <div>
                <label htmlFor="image.url" className="form-label">
                  קישור לתמונה
                </label>
                <input
                  id="image.url"
                  name="image.url"
                  type="url"
                  className="form-input"
                  value={formData.image.url}
                  onChange={handleChange}
                />
              </div>
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

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex justify-center items-center"
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  'שמור שינויים'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
