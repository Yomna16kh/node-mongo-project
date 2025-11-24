import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    phone: '',
    email: '',
    web: '',
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
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchCard();
  }, [id]);

  const fetchCard = async () => {
    try {
      const response = await axios.get(`/cards/${id}`);
      const card = response.data;
      setFormData({
        title: card.title || '',
        subtitle: card.subtitle || '',
        description: card.description || '',
        phone: card.phone || '',
        email: card.email || '',
        web: card.web || '',
        image: {
          url: card.image?.url || '',
          alt: card.image?.alt || ''
        },
        address: {
          state: card.address?.state || '',
          country: card.address?.country || '',
          city: card.address?.city || '',
          street: card.address?.street || '',
          houseNumber: card.address?.houseNumber || '',
          zip: card.address?.zip || ''
        }
      });
    } catch (error) {
      setError('שגיאה בטעינת הכרטיס');
    } finally {
      setInitialLoading(false);
    }
  };

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

      await axios.put(`/cards/${id}`, submitData);
      navigate('/my-cards');
    } catch (error) {
      setError(error.response?.data?.message || 'שגיאה בעדכון הכרטיס');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            עריכת כרטיס ביקור
          </h1>
          <p className="text-lg text-gray-600">
            עדכן את פרטי כרטיס הביקור שלך
          </p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">פרטי העסק</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="form-label">
                    שם העסק *
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="form-input"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="subtitle" className="form-label">
                    תיאור קצר *
                  </label>
                  <input
                    id="subtitle"
                    name="subtitle"
                    type="text"
                    required
                    className="form-input"
                    value={formData.subtitle}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="form-label">
                    תיאור מפורט *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    className="form-input"
                    value={formData.description}
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
              </div>
              <div className="mt-4">
                <label htmlFor="web" className="form-label">
                  אתר אינטרנט
                </label>
                <input
                  id="web"
                  name="web"
                  type="url"
                  className="form-input"
                  value={formData.web}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">תמונה</h3>
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
              <h3 className="text-lg font-medium text-gray-900 mb-4">כתובת העסק</h3>
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

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/my-cards')}
                className="flex-1 btn-secondary"
              >
                ביטול
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary flex justify-center items-center"
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

export default EditCard;
