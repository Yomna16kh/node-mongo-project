import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'קישורים מהירים',
      links: [
        { name: 'כרטיסי ביקור', href: '/cards' },
        { name: 'הרשמה', href: '/register' },
        { name: 'התחברות', href: '/login' },
        { name: 'אודות', href: '#' }
      ]
    },
    {
      title: 'שירותים',
      links: [
        { name: 'יצירת כרטיס ביקור', href: '/create-card' },
        { name: 'ניהול כרטיסים', href: '/my-cards' },
        { name: 'פרופיל משתמש', href: '/profile' },
        { name: 'תמיכה טכנית', href: '#' }
      ]
    },
    {
      title: 'חברה',
      links: [
        { name: 'אודותינו', href: '#' },
        { name: 'צור קשר', href: '#' },
        { name: 'תנאי שימוש', href: '#' },
        { name: 'מדיניות פרטיות', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-secondary-900 to-secondary-800 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-glow">
                כ
              </div>
              <span className="text-2xl font-bold">כרטיסי ביקור</span>
            </div>
            <p className="text-secondary-300 leading-relaxed mb-6">
              מערכת ניהול כרטיסי ביקור מודרנית ונוחה לשימוש.
              צרו, עדכנו ונהלו את כרטיסי הביקור שלכם בקלות.
            </p>

            {/* Social links */}
            <div className="flex space-x-4 space-x-reverse">
              {['📘', '📷', '��', '💼'].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-secondary-700 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                >
                  <span className="text-lg">{icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-lg font-bold text-white mb-6">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.href}
                    className="block text-secondary-300 hover:text-primary-400 transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="border-t border-secondary-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 text-secondary-300">
              <span className="text-primary-400 text-xl">📧</span>
              <span>info@cards.co.il</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-300">
              <span className="text-primary-400 text-xl">📞</span>
              <span>03-1234567</span>
            </div>
            <div className="flex items-center gap-3 text-secondary-300">
              <span className="text-primary-400 text-xl">📍</span>
              <span>תל אביב, ישראל</span>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-secondary-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-secondary-400 text-sm">
              © {currentYear} כרטיסי ביקור. כל הזכויות שמורות.
            </div>



          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
