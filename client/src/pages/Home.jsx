import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: '🎨',
      title: 'עיצוב מקצועי',
      description: 'כרטיסי ביקור עם עיצוב מודרני ומקצועי שמותאם לעסק שלכם',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: '⚡',
      title: 'מהיר ונוח',
      description: 'יצירה ועריכה מהירה של כרטיסי ביקור עם ממשק פשוט ואינטואיטיבי',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: '🔒',
      title: 'בטוח ומאובטח',
      description: 'המידע שלכם מוגן ברמת אבטחה גבוהה עם הרשאות מתקדמות',
      color: 'from-success-500 to-success-600'
    },
    {
      icon: '��',
      title: 'רספונסיבי',
      description: 'עובד מושלם על כל המכשירים - מחשב, טאבלט וסמארטפון',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '🌟',
      title: 'חוויית משתמש מעולה',
      description: 'ממשק משתמש מודרני ונוח עם אנימציות חלקות ועיצוב מושקע',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '🚀',
      title: 'ביצועים מהירים',
      description: 'טעינה מהירה וביצועים מעולים עם טכנולוגיות מתקדמות',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const stats = [
    { number: '1000+', label: 'כרטיסי ביקור נוצרו' },
    { number: '500+', label: 'עסקים רשומים' },
    { number: '99.9%', label: 'זמינות השירות' },
    { number: '24/7', label: 'תמיכה טכנית' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero-bg relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating absolute top-20 left-10 w-20 h-20 bg-primary-200/30 rounded-full blur-xl"></div>
          <div className="floating absolute top-40 right-20 w-32 h-32 bg-accent-200/20 rounded-full blur-2xl"></div>
          <div className="floating absolute bottom-20 left-1/4 w-24 h-24 bg-success-200/25 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-24 h-24 rounded-3xl flex items-center justify-center font-bold text-4xl shadow-glow animate-bounce-gentle">
                כ
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-secondary-900 mb-6 animate-slide-up">
              מערכת ניהול
              <span className="gradient-text block mt-2">כרטיסי ביקור</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-secondary-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
              פלטפורמה מודרנית ונוחה לניהול כרטיסי ביקור דיגיטליים. 
              <br className="hidden md:block" />
              צרו, עדכנו ושתפו את כרטיסי הביקור שלכם בקלות ובמהירות.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              {user ? (
                <>
                  <Link
                    to="/cards"
                    className="btn-primary text-lg px-8 py-4 btn-icon shadow-large hover:shadow-glow"
                  >
                    <span className="text-xl">📇</span>
                    צפה בכרטיסי ביקור
                  </Link>
                  {user.isBusiness && (
                    <Link
                      to="/create-card"
                      className="btn-secondary text-lg px-8 py-4 btn-icon"
                    >
                      <span className="text-xl">✨</span>
                      צור כרטיס חדש
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn-primary text-lg px-8 py-4 btn-icon shadow-large hover:shadow-glow"
                  >
                    <span className="text-xl">🚀</span>
                    הרשמה חינם
                  </Link>
                  <Link
                    to="/login"
                    className="btn-secondary text-lg px-8 py-4 btn-icon"
                  >
                    <span className="text-xl">🔑</span>
                    התחברות
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/60 backdrop-blur-sm py-16 animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-secondary-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
              למה לבחור במערכת שלנו?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              תכונות מתקדמות לניהול יעיל של כרטיסי ביקור עם חוויית משתמש מעולה
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card card-hover p-8 text-center group animate-scale-in"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl shadow-medium group-hover:shadow-large transition-all duration-300 group-hover:scale-110`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              מוכנים להתחיל?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-3xl mx-auto">
              הצטרפו אלינו עוד היום ותתחילו ליצור כרטיסי ביקור מקצועיים
              <br className="hidden md:block" />
              עם הטכנולוגיה הכי מתקדמת
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-secondary-50 transition-all duration-300 inline-flex items-center gap-3 shadow-large hover:shadow-glow transform hover:-translate-y-1"
                >
                  <span className="text-xl">🎯</span>
                  הרשמה חינם עכשיו
                </Link>
                <Link
                  to="/cards"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-primary-600 transition-all duration-300 inline-flex items-center gap-3 transform hover:-translate-y-1"
                >
                  <span className="text-xl">👀</span>
                  צפה בדוגמאות
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gradient-to-br from-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              מה אומרים עלינו
            </h2>
            <p className="text-xl text-secondary-600">
              לקוחות מרוצים מכל רחבי הארץ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "שרה כהן",
                role: "מעצבת גרפית",
                content: "המערכת הכי טובה שהשתמשתי בה! קלה לשימוש ומקצועית.",
                rating: 5
              },
              {
                name: "דוד לוי",
                role: "יועץ עסקי",
                content: "חסכה לי המון זמן ועזרה לי להציג את העסק בצורה מקצועית.",
                rating: 5
              },
              {
                name: "מיכל אברהם",
                role: "צלמת",
                content: "עיצוב מדהים וקל להשתמש. ממליצה בחום!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="card p-6 animate-scale-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent-500 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-secondary-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold ml-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-secondary-900">{testimonial.name}</div>
                    <div className="text-sm text-secondary-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
