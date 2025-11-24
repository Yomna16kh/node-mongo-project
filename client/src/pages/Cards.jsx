import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Cards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('/cards');
      setCards(response.data);
    } catch (error) {
      setError('שגיאה בטעינת הכרטיסים');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (cardId) => {
    if (!user) return;
    
    try {
      const response = await axios.patch(`/cards/${cardId}`);
      setCards(cards.map(card => 
        card._id === cardId ? response.data : card
      ));
    } catch (error) {
      console.error('Error liking card:', error);
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterCategory === 'all') return matchesSearch;
    if (filterCategory === 'liked' && user) return matchesSearch && card.likes?.includes(user._id);
    if (filterCategory === 'recent') return matchesSearch; // Could add date filtering
    
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-secondary-600 font-medium">טוען כרטיסי ביקור...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-4">
            כרטיסי ביקור
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            גלה עסקים ושירותים מקצועיים מכל רחבי הארץ
          </p>
        </div>

        {/* Search and Filter */}
        <div className="card p-6 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="חפש כרטיסי ביקור..."
                  className="form-input pl-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400">
                  🔍
                </div>
              </div>
            </div>
            <div className="md:w-48">
              <select
                className="form-input"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">כל הכרטיסים</option>
                {user && <option value="liked">כרטיסים שאהבתי</option>}
                <option value="recent">חדשים</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8 animate-slide-up">
            <div className="flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {filteredCards.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">📇</div>
              <h3 className="text-2xl font-bold text-secondary-900 mb-4">
                {searchTerm ? 'לא נמצאו תוצאות' : 'אין כרטיסי ביקור להצגה'}
              </h3>
              <p className="text-secondary-600 mb-6">
                {searchTerm 
                  ? 'נסה לחפש במילים אחרות או לשנות את הפילטר'
                  : 'כרטיסי ביקור חדשים יופיעו כאן בקרוב'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="btn-primary"
                >
                  נקה חיפוש
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="mb-6 text-secondary-600 animate-fade-in">
              נמצאו {filteredCards.length} כרטיסי ביקור
            </div>

            {/* Cards Grid */}
            <div className="cards-grid">
              {filteredCards.map((card, index) => (
                <div 
                  key={card._id} 
                  className="card card-hover group animate-scale-in"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={card.image?.url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"}
                      alt={card.image?.alt || card.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Like button */}
                    {user && (
                      <button
                        onClick={() => handleLike(card._id)}
                        className={`absolute top-4 left-4 p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                          card.likes?.includes(user._id)
                            ? 'bg-red-500 text-white shadow-glow'
                            : 'bg-white/90 backdrop-blur-sm text-secondary-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                      >
                        <span className="text-lg">
                          {card.likes?.includes(user._id) ? '❤️' : '🤍'}
                        </span>
                      </button>
                    )}

                    {/* Business number badge */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-secondary-600">
                      #{card.bizNumber}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">
                        {card.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-secondary-500">
                        <span>❤️</span>
                        <span>{card.likes?.length || 0}</span>
                      </div>
                    </div>
                    
                    <p className="text-primary-600 font-semibold mb-3">
                      {card.subtitle}
                    </p>
                    
                    <p className="text-secondary-600 mb-6 line-clamp-2 leading-relaxed">
                      {card.description}
                    </p>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3 text-secondary-600">
                        <span className="text-primary-500 text-base">📞</span>
                        <span className="font-medium">{card.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-secondary-600">
                        <span className="text-primary-500 text-base">📧</span>
                        <span className="font-medium truncate">{card.email}</span>
                      </div>
                      {card.web && (
                        <div className="flex items-center gap-3 text-secondary-600">
                          <span className="text-primary-500 text-base">🌐</span>
                          <a 
                            href={card.web} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 font-medium truncate transition-colors"
                          >
                            {card.web.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-secondary-600">
                        <span className="text-primary-500 text-base">📍</span>
                        <span className="font-medium">
                          {card.address.street} {card.address.houseNumber}, {card.address.city}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 pt-4 border-t border-secondary-100">
                      <div className="flex gap-3">
                        <button className="flex-1 bg-primary-50 text-primary-600 py-2 px-4 rounded-lg hover:bg-primary-100 transition-colors font-medium text-sm">
                          צור קשר
                        </button>
                        <button className="flex-1 bg-secondary-50 text-secondary-600 py-2 px-4 rounded-lg hover:bg-secondary-100 transition-colors font-medium text-sm">
                          שתף
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cards;
