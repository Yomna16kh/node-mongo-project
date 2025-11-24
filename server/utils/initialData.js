import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Card from '../models/Card.js';
import mongoose from 'mongoose';

export const initializeData = async () => {
  try {
    // Enhanced database connection check
    if (mongoose.connection.readyState !== 1) {
      console.log('📝 Database not connected, skipping initial data setup');
      return;
    }

    // Check if users already exist
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('✅ Initial data already exists');
      console.log(`👥 Found ${userCount} existing users`);
      
      // Check cards count too
      const cardCount = await Card.countDocuments();
      console.log(`📇 Found ${cardCount} existing cards`);
      return;
    }

    console.log('🔄 Setting up initial sample data...');

    // Create initial users with enhanced data
    const salt = await bcrypt.genSalt(12); // Increased salt rounds for better security
    const hashedPassword = await bcrypt.hash('Aa123456!', salt);

    const users = [
      {
        name: {
          first: "רון",
          middle: "",
          last: "כהן"
        },
        phone: "050-1234567",
        email: "ron@example.com",
        password: hashedPassword,
        image: {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          alt: "תמונת פרופיל של רון"
        },
        address: {
          state: "מרכז",
          country: "ישראל",
          city: "תל אביב",
          street: "רחוב הרצל",
          houseNumber: 10,
          zip: 12345
        },
        isAdmin: false,
        isBusiness: false
      },
      {
        name: {
          first: "שרה",
          middle: "",
          last: "לוי"
        },
        phone: "052-7654321",
        email: "sara@business.com",
        password: hashedPassword,
        image: {
          url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          alt: "תמונת פרופיל של שרה"
        },
        address: {
          state: "צפון",
          country: "ישראל",
          city: "חיפה",
          street: "רחוב בן גוריון",
          houseNumber: 25,
          zip: 54321
        },
        isAdmin: false,
        isBusiness: true
      },
      {
        name: {
          first: "אדמין",
          middle: "",
          last: "ראשי"
        },
        phone: "053-9876543",
        email: "admin@system.com",
        password: hashedPassword,
        image: {
          url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          alt: "תמונת פרופיל של האדמין"
        },
        address: {
          state: "ירושלים",
          country: "ישראל",
          city: "ירושלים",
          street: "רחוב המלך ג'ורג'",
          houseNumber: 5,
          zip: 67890
        },
        isAdmin: true,
        isBusiness: true
      },
      {
        name: {
          first: "מיכל",
          middle: "",
          last: "אברהם"
        },
        phone: "054-1122334",
        email: "michal@creative.com",
        password: hashedPassword,
        image: {
          url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          alt: "תמונת פרופיל של מיכל"
        },
        address: {
          state: "מרכז",
          country: "ישראל",
          city: "רמת גן",
          street: "רחוב ביאליק",
          houseNumber: 18,
          zip: 13579
        },
        isAdmin: false,
        isBusiness: true
      }
    ];

    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} initial users successfully`);

    // Create initial cards with enhanced content
    const cards = [
      {
        title: "שירותי עיצוב גרפי מקצועיים",
        subtitle: "עיצוב מקצועי ויצירתי לכל צורך",
        description: "שירותי עיצוב גרפי מקצועיים הכוללים עיצוב לוגו, כרטיסי ביקור, ברושורים, קטלוגים ועיצוב דיגיטלי. ניסיון של מעל 10 שנים בתחום עם לקוחות מכל הסקטורים. מתמחים בעיצוב ייחודי שמבטא את הזהות העסקית שלכם.",
        phone: "052-7654321",
        email: "sara@business.com",
        web: "https://saradesign.com",
        image: {
          url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
          alt: "עיצוב גרפי מקצועי"
        },
        address: {
          state: "צפון",
          country: "ישראל",
          city: "חיפה",
          street: "רחוב בן גוריון",
          houseNumber: 25,
          zip: 54321
        },
        user_id: createdUsers[1]._id
      },
      {
        title: "ייעוץ טכנולוגי ופתרונות IT",
        subtitle: "פתרונות IT מתקדמים לעסקים",
        description: "ייעוץ טכנולוגי מקצועי לעסקים מכל הגדלים. שירותים כוללים: פיתוח תוכנה מותאמת אישית, בניית אתרי אינטרנט מתקדמים, מערכות ניהול תוכן, אינטגרציה עם מערכות קיימות ותמיכה טכנית מתמשכת. צוות מנוסה עם הכשרה מתקדמת בטכנולוגיות החדישות ביותר.",
        phone: "053-9876543",
        email: "admin@system.com",
        web: "https://techconsult.co.il",
        image: {
          url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
          alt: "ייעוץ טכנולוגי מתקדם"
        },
        address: {
          state: "ירושלים",
          country: "ישראל",
          city: "ירושלים",
          street: "רחוב המלך ג'ורג'",
          houseNumber: 5,
          zip: 67890
        },
        user_id: createdUsers[2]._id
      },
      {
        title: "שירותי צילום מקצועיים",
        subtitle: "צילום אירועים ופורטרטים ברמה גבוהה",
        description: "שירותי צילום מקצועיים לכל סוגי האירועים: חתונות, בר/בת מצווה, אירועי חברה, צילומי משפחה ופורטרטים אישיים. ציוד צילום מתקדם, עריכה מקצועית ושירות אישי ומסור. מתמחים ביצירת זיכרונות בלתי נשכחים עם איכות צילום ברמה הגבוהה ביותר.",
        phone: "054-1112233",
        email: "photo@events.com",
        web: "https://eventphoto.co.il",
        image: {
          url: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=250&fit=crop",
          alt: "שירותי צילום מקצועיים"
        },
        address: {
          state: "מרכז",
          country: "ישראל",
          city: "רמת גן",
          street: "רחוב ביאליק",
          houseNumber: 15,
          zip: 13579
        },
        user_id: createdUsers[1]._id
      },
      {
        title: "סטודיו יצירה ועיצוב",
        subtitle: "יצירות אמנות ועיצוב פנים ייחודיות",
        description: "סטודיו יצירה המתמחה בעיצוב פנים ויצירות אמנות מקוריות. שירותים כוללים: עיצוב פנים מלא, ייעוץ עיצוב, יצירת אמנות מותאמת אישית, עיצוב רהיטים ייחודיים ועיצוב חללי עבודה. גישה יצירתית ומקצועית המשלבת פונקציונליות עם אסתטיקה מרהיבה.",
        phone: "054-1122334",
        email: "michal@creative.com",
        web: "https://creativestudio.co.il",
        image: {
          url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
          alt: "סטודיו יצירה ועיצוב"
        },
        address: {
          state: "מרכז",
          country: "ישראל",
          city: "רמת גן",
          street: "רחוב ביאליק",
          houseNumber: 18,
          zip: 13579
        },
        user_id: createdUsers[3]._id
      },
      {
        title: "שירותי ייעוץ עסקי ואסטרטגי",
        subtitle: "ייעוץ עסקי מקצועי לצמיחה ופיתוח",
        description: "שירותי ייעוץ עסקי מקצועיים המסייעים לעסקים לצמוח ולהתפתח. התמחויות כוללות: תכנון אסטרטגי, ייעוץ פיננסי, פיתוח עסקי, ניהול שינויים ואופטימיזציה של תהליכים עסקיים. ניסיון עשיר בליווי עסקים מכל הגדלים להשגת יעדיהם העסקיים.",
        phone: "053-9876543",
        email: "admin@system.com",
        web: "https://businessconsult.co.il",
        image: {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
          alt: "ייעוץ עסקי מקצועי"
        },
        address: {
          state: "ירושלים",
          country: "ישראל",
          city: "ירושלים",
          street: "רחוב המלך ג'ורג'",
          houseNumber: 5,
          zip: 67890
        },
        user_id: createdUsers[2]._id
      }
    ];

    const createdCards = await Card.create(cards);
    console.log(`✅ Created ${createdCards.length} initial cards successfully`);
    
    console.log('\n🎉 ===== INITIAL DATA SETUP COMPLETED =====');
    console.log(`👥 Users created: ${createdUsers.length}`);
    console.log(`📇 Cards created: ${createdCards.length}`);
    console.log('==========================================\n');

    // Log sample login credentials
    console.log('🔑 Sample Login Credentials:');
    console.log('📧 Regular User: ron@example.com / Aa123456!');
    console.log('💼 Business User: sara@business.com / Aa123456!');
    console.log('⚙️  Admin User: admin@system.com / Aa123456!');
    console.log('🎨 Creative User: michal@creative.com / Aa123456!');
    console.log('==========================================\n');

  } catch (error) {
    console.error('❌ Error initializing sample data:', error.message);
    if (error.code === 11000) {
      console.log('📝 Note: Some sample data may already exist (duplicate key error)');
    }
  }
};
