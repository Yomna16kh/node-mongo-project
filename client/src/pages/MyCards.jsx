import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchMyCards();
  }, []);

  const fetchMyCards = async () => {
    try {
      const response = await axios.get('/cards/my-cards');
      setCards(response.data);
    } catch (error) {
      setError('שגיאה בטעינת הכרטיסים');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cardId) => {
    if (!window.confirm('האם אתה בטוח שברצונך למחוק את הכרטיס?')) {
      return;
    }

    try {
      await axios.delete(`/cards/${cardId}`);
      setCards(cards.filter(card => card._id !== cardId));
    } catch (error) {
      setError('שגיאה במחיקת הכרטיס');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              הכרטיסים שלי
            </h1>
            <p className="text-lg text-gray-600">
              נהל את כרטיסי הביקור שלך
            </p>
          </div>
          {user?.isBusiness && (
            <Link
              to="/create-card"
              className="btn-primary"
            >
              צור כרטיס חדש
            </Link>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {cards.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">📇</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              אין לך כרטיסי ביקור עדיין
            </h3>
            <p className="text-gray-500 mb-6">
              {user?.isBusiness 
                ? 'צור את הכרטיס הראשון שלך כדי להתחיל'
                : 'רק משתמשים עסקיים יכולים ליצור כרטיסי ביקור'
              }
            </p>
            {user?.isBusiness && (
              <Link
                to="/create-card"
                className="btn-primary"
              >
                צור כרטיס ביקור
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card._id} className="card hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={card.image?.url || "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg"}
                    alt={card.image?.alt || card.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded text-xs">
                    {card.likes?.length || 0} לייקים
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {card.subtitle}
                  </p>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {card.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <span className="font-medium ml-2">📞</span>
                      {card.phone}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium ml-2">📧</span>
                      {card.email}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium ml-2">📍</span>
                      {card.address.street} {card.address.houseNumber}, {card.address.city}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/edit-card/${card._id}`}
                      className="flex-1 btn-secondary text-center text-sm"
                    >
                      ערוך
                    </Link>
                    <button
                      onClick={() => handleDelete(card._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      מחק
                    </button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 text-center">
                    <span className="text-xs text-gray-500">
                      מספר עסק: {card.bizNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCards;
