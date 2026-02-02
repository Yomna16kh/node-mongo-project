import mongoose from 'mongoose';
import User from '../models/User.js';
import Card from '../models/Card.js';

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

    // ---------------- USERS ----------------
    if (userCount === 0) {
      const users = [
        {
          name: { first: "רון", middle: "", last: "כהן" },
          phone: "050-1234567",
          email: "ron@example.com",
          password: "Aa123456!", // ❗ לא להצפין כאן
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
          password: "Aa123456!",
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
          password: "Aa123456!",
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
        }
      ];

      await User.create(users);
      console.log('✅ Sample users created');
    } else {
      console.log('ℹ️ Users already exist');
    }

    // ---------------- CARDS ----------------
    if (cardCount === 0) {
      const saraUser = await User.findOne({ email: "sara@business.com" });
      const adminUser = await User.findOne({ email: "admin@system.com" });

      if (!saraUser || !adminUser) {
        console.log("⚠️ Required users not found, skipping card creation");
        return;
      }

      const cards = [
        {
          title: "שירותי עיצוב גרפי מקצועיים",
          subtitle: "עיצוב מקצועי ויצירתי לכל צורך",
          description: "עיצוב לוגו, כרטיסי ביקור וברושורים.",
          phone: "052-7654321",
          email: "sara@business.com",
          web: "https://saradesign.com",
          bizNumber: 1000001,
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
          user_id: saraUser._id
        },
        {
          title: "ייעוץ טכנולוגי ופתרונות IT",
          subtitle: "פתרונות IT מתקדמים לעסקים",
          description: "פיתוח תוכנה ובניית אתרים.",
          phone: "053-9876543",
          email: "admin@system.com",
          web: "https://techconsult.co.il",
          bizNumber: 1000002,
          image: {
            url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
            alt: "ייעוץ טכנולוגי מתקדם"
          },
          address: {
            state: "ירושלים",
            country: "ישראל",
            city: "ירושלים",
            street: "רחוב המלך ג'ורג",
            houseNumber: 5,
            zip: 67890
          },
          user_id: adminUser._id
        }
      ];

      await Card.create(cards);
      console.log('✅ Sample cards created');
    } else {
      console.log('ℹ️ Cards already exist');
    }

    console.log('\n🎉 Initial data setup completed\n');

  } catch (error) {
    console.error('❌ Error initializing sample data:', error.message);
  }
};