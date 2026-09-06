# City 2 – Indian Wedding Invitation Website

A 100% pixel-accurate, standalone, and responsive replica of the [Missing Piece Invites 'City 2'](https://www.missingpieceinvites.com/demos/city-2) Indian Wedding Invitation website template.

## ✨ Features

- **Royal Rajasthan Vintage Aesthetic**: Slate-blue and heritage warm palette, vintage open-roof car illustrations, palace skyline silhouettes, cane rattan arches, and botanical accents.
- **Audio Experience**: Floating music toggle button playing the soulful acoustic background wedding melody (`assets/audio/wedding_soundtrack.mp3`) with animated sound equalizer bars and smart mobile autoplay unlock.
- **Interactive Ceremonies**: 6 arched cane wicker cards with floral corners:
  - **Mehendi** – Friday, March 9th 2026 | Rambagh, Jaipur (6pm Onwards)
  - **Haldi** – Saturday, March 10th 2026 | Rambagh, Jaipur (10am Onwards)
  - **Cocktail** – Saturday, March 10th 2026 | Rambagh, Jaipur (8pm Onwards)
  - **Engagement** – Sunday, March 11th 2026 | Rambagh, Jaipur (7pm Onwards)
  - **Shaadi** – Monday, March 12th 2026 | Rambagh, Jaipur (7pm Onwards)
  - **Reception** – Saturday, March 17th 2026 | Rambagh, Jaipur (8pm Onwards)
  - Direct "See the route" buttons opening Google Maps.
- **Interactive Photo Carousel**: "Meet the Bride & Groom" ornate photo frame with 6 high-resolution pre-wedding portraits, previous/next controls, dot indicators, and touch swipe gestures.
- **Live Countdown Timer**: Real-time Days : Hours : Minutes : Seconds live clock counting down to the wedding date.
- **WhatsApp RSVP**: Direct one-tap RSVP link opening WhatsApp with a pre-filled greeting message.
- **Things to Know**: 4 Information cards covering Wedding Hashtag (`#abkan`), Venue Weather (28°C sunny), Staff Accommodation (Hotel Bhola Bhawan), and Valet Parking.
- **100% Offline & Standalone**: All 29 graphic assets and background audio track are locally bundled inside `card/assets/`. Zero external telemetry, tracking pixels, or third-party store banners.

## 🚀 Quick Start (Local Preview)

Run a local HTTP server from the project directory:

```bash
# Preview directly from card folder
python3 -m http.server 8000 --directory card
```

Then open your browser at:
`http://localhost:8000`

## 📁 Directory Structure

```
card/
├── assets/
│   ├── audio/
│   │   └── wedding_soundtrack.mp3       # Soulful background soundtrack
│   └── images/
│       ├── hero/                        # Vintage car, sky palace, textures
│       ├── cards/                       # Cane border arch, flower corners
│       ├── breakers/                    # Vintage car section separators
│       ├── gallery/                     # 6 couple portraits, frame, arrows
│       ├── info_icons/                  # Hashtag, weather, staff, parking icons
│       └── footer/                      # Sunset car & skyline
├── css/
│   ├── typography.css                   # Cormorant, Gotu, Manrope fonts
│   ├── animations.css                   # Spring bounce, car drive-in, pulse
│   ├── style.css                        # Layout, cards, colors, buttons
│   └── responsive.css                   # Mobile (<810px), Tablet, Desktop
├── js/
│   ├── music-player.js                  # Audio controls & autoplay fallback
│   ├── photo-carousel.js                # Meet the couple slider & touch swipe
│   ├── countdown.js                     # Live countdown ticker
│   └── appear-animations.js             # Staggered scroll entrance effects
├── index.html                           # Main invitation webpage
└── SPEC.md                              # Formal specification
```

## 🛠️ Customization

- **Couple & Family Names**: Edit text in `card/index.html` under Section 2 (`#blessings`).
- **Ceremony Dates & Venues**: Update cards inside Section 3 (`#events`).
- **Couple Portraits**: Replace `card/assets/images/gallery/photo_1.jpeg` through `photo_6.jpeg` with your own pre-wedding photos.
- **Music**: Replace `card/assets/audio/wedding_soundtrack.mp3` with your preferred wedding track.
- **WhatsApp Number**: Update `https://wa.me/91XXXXXXXXXX` in Section 5 (`#rsvp`).
