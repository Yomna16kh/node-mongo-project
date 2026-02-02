import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Card from '../models/Card.js';
import mongoose from 'mongoose';

export const initializeData = async () => {
  try {
    if (mongoose.connection.readyState !== 1) {
      console.log('📝 Database not connected, skipping initial data setup');
      return;
    }

    const userCount = await User.countDocuments();
    const cardCount = await Card.countDocuments();

    console.log(`👥 Users in DB: ${userCount}`);
    console.log(`📇 Cards in DB: ${cardCount}`);

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('Aa123456!', salt);

    let createdUsers = [];

    const users = [
      {
        name: { first: "רון", middle: "", last: "כהן" },
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
        name: { first: "שרה", middle: "", last: "לוי" },
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
        name: { first: "אדמין", middle: "", last: "ראשי" },
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
        name: { first: "מיכל", middle: "", last: "אברהם" },
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

    if (userCount === 0) {
      createdUsers = await User.create(users);
      console.log(`✅ Created ${createdUsers.length} users`);
    } else {
      createdUsers = await User.find();
      console.log('ℹ️ Users already exist, using existing users');
    }

    if (cardCount === 0) {
      const cards = [
        {
          title: "שירותי עיצוב גרפי מקצועיים",
          subtitle: "עיצוב מקצועי ויצירתי לכל צורך",
          description: "שירותי עיצוב גרפי מקצועיים הכוללים עיצוב לוגו, כרטיסי ביקור וברושורים.",
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
          description: "פיתוח תוכנה, בניית אתרים ואינטגרציות מתקדמות.",
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
        }
      ];

      const createdCards = await Card.create(cards);
      console.log(`✅ Created ${createdCards.length} cards`);
    } else {
      console.log('ℹ️ Cards already exist');
    }

    console.log('\n🎉 Initial data setup completed\n');

  } catch (error) {
    console.error('❌ Error initializing sample data:', error.message);
  }
};