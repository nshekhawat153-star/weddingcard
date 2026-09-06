/**
 * Royal Wedding Invitation Configuration & Data
 * Easily customizable for any couple, family, dates, and venues.
 */
const WEDDING_DATA = {
  // Couple Information
  groom: {
    title: "कुँवर",
    firstName: "Arjun",
    lastName: "Shekhawat",
    hindiName: "अर्जुन",
    bio: "Grandson of Late Smt. Kamala Devi & Late Shri Bhawani Singh Shekhawat\nSon of Smt. Sunita & Shri Rajesh Singh Shekhawat",
    parents: "Smt. Sunita & Shri Rajesh Singh Shekhawat",
    city: "Jaipur, Rajasthan"
  },
  bride: {
    title: "राजकुमारी",
    firstName: "Ananya",
    lastName: "Rathore",
    hindiName: "अनन्या",
    bio: "Granddaughter of Smt. Gayatri Devi & Shri Gajendra Singh Rathore\nSon of Smt. Meenakshi & Shri Vikramaditya Singh Rathore",
    parents: "Smt. Meenakshi & Shri Vikramaditya Singh Rathore",
    city: "Udaipur, Rajasthan"
  },

  // Main Auspicious Quotes
  shloka: {
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
    meaning: "O Lord Ganesha, with curved trunk and radiant aura of a million suns, please remove all obstacles from our auspicious endeavors forever."
  },

  welcomeNote: {
    hindi: "॥ श्री गणेशाय नमः ॥",
    subHindi: "मंगलम् भगवान विष्णुः मङ्गलं गरुडध्वजः।",
    english: "With the divine blessings of our ancestors and elders, we cordially invite you to celebrate the union of two souls and families."
  },

  // Target Wedding Date for Live Countdown (YYYY-MM-DDTHH:mm:ss)
  weddingDateISO: "2026-11-28T19:00:00+05:30",
  weddingDisplayDate: "Saturday, 28th November 2026",

  // Wedding Itinerary & Events
  events: [
    {
      id: "haldi",
      nameHindi: "हल्दी की रस्म",
      nameEnglish: "Shubh Haldi Ceremony",
      tagline: "पीली धूप सी खुशियां, हल्दी के पावन रंग में",
      date: "Friday, 27 November 2026",
      time: "10:00 AM onwards",
      venue: "Suraj Pol Courtyard, The Grand Heritage Palace",
      dressCode: "Haldi Yellow & Floral Attire",
      colorTheme: "#E69500",
      accentBg: "rgba(255, 193, 7, 0.12)",
      icon: "assets/icons/haldi.svg"
    },
    {
      id: "mehndi",
      nameHindi: "मेहंदी की रात",
      nameEnglish: "Mehndi Celebration",
      tagline: "सजन के नाम की मेहंदी रचेगी, महकेगा सारा आंगन",
      date: "Friday, 27 November 2026",
      time: "04:30 PM onwards",
      venue: "Gulab Baag Lawns, The Grand Heritage Palace",
      dressCode: "Forest Green & Festive Pastel",
      colorTheme: "#2E7D32",
      accentBg: "rgba(46, 125, 50, 0.12)",
      icon: "assets/icons/mehndi.svg"
    },
    {
      id: "sangeet",
      nameHindi: "सुर और ताल की शाम",
      nameEnglish: "Royal Sangeet & Cocktails",
      tagline: "गीतों की महफ़िल, ढोल की थाप और नाचते कदम",
      date: "Friday, 27 November 2026",
      time: "07:30 PM onwards",
      venue: "Sheesh Mahal Ballroom, The Grand Heritage Palace",
      dressCode: "Indo-Western & Glamour Shimmer",
      colorTheme: "#1565C0",
      accentBg: "rgba(21, 101, 192, 0.12)",
      icon: "assets/icons/sangeet.svg"
    },
    {
      id: "vivah",
      nameHindi: "शुभ विवाह एवं सात फेरे",
      nameEnglish: "Baraat & Sacred Nuptials",
      tagline: "अग्नि को साक्षी मानकर, सात जन्मों का पावन बंधन",
      date: "Saturday, 28 November 2026",
      time: "Baraat 6:30 PM | Varmala 8:00 PM | Phere 10:15 PM",
      venue: "Mayur Mandapam, The Grand Heritage Palace, Amer Road, Jaipur",
      dressCode: "Royal Traditional Indian Attire",
      colorTheme: "#8B0000",
      accentBg: "rgba(139, 0, 0, 0.12)",
      icon: "assets/icons/havan.svg",
      highlight: true
    },
    {
      id: "reception",
      nameHindi: "स्नेह मिलन एवं प्रीतिभोज",
      nameEnglish: "Grand Royal Reception",
      tagline: "नव-दंपति को अपने स्नेह और मंगल आशीष से नवाजें",
      date: "Sunday, 29 November 2026",
      time: "07:30 PM onwards",
      venue: "The Palace Grand Lawn, Jaipur",
      dressCode: "Royal Formal & Ethnic Elegance",
      colorTheme: "#6A1B9A",
      accentBg: "rgba(106, 27, 154, 0.12)",
      icon: "assets/icons/reception.svg"
    }
  ],

  // Venue & Navigation
  venue: {
    name: "The Grand Heritage Palace",
    address: "Palace Road, Near Amer Fort, Jaipur, Rajasthan - 302001",
    mapQuery: "The+Grand+Heritage+Palace+Jaipur",
    mapUrl: "https://maps.google.com/?q=Amer+Fort+Jaipur"
  },

  // RSVP Contacts
  rsvp: {
    greetingHindi: "॥ दर्शनाभिलाषी एवं स्वागताकांक्षी ॥",
    blessingNote: "Your presence and warm blessings are the greatest gifts we could ever ask for.",
    contacts: [
      {
        name: "Shri Rajesh Singh Shekhawat",
        phone: "+91 98765 43210",
        relation: "Groom's Father"
      },
      {
        name: "Shri Vikramaditya Singh Rathore",
        phone: "+91 98765 43211",
        relation: "Bride's Father"
      },
      {
        name: "Devendra Singh (RSVP Coordinator)",
        phone: "+91 98765 43212",
        relation: "Wedding Coordinator"
      }
    ],
    whatsappNumber: "916350013162",
    whatsappMessage: "Namaste! We are overjoyed to receive the wedding invitation of Arjun & Ananya. We would love to join and shower our blessings! ✨🎉"
  }
};
