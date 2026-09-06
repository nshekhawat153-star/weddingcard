/**
 * Royal Pastel Wedding Main Application Controller
 * Features:
 * - Flawless Horizontal Carousel Slider (Zero Overlap, Ample Breathing Room)
 * - Touch Swipe Gestures for 100% Mobile Optimization
 * - Real-time Countdown Timer in Pastel Elegance
 * - "Phool Barsao" Celebratory Blessings
 * - WhatsApp RSVP & Google Calendar Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Petal Physics
  window.petalEngine = new PetalSimulation('petals-canvas');

  // 2. Initialize Audio Manager (Bollywood Wedding Song)
  window.royalAudio = new RoyalAudioManager();

  // 3. Initialize Royal Envelope
  window.royalEnvelope = new RoyalEnvelope({
    onOpen: () => {
      window.royalAudio.startOnEnvelopeOpen();
    }
  });

  // 4. Initialize Flawless Card Slider Controller
  const cardController = new CardDeckController();

  // 5. Initialize Countdown Timer
  initCountdownTimer();

  // 6. Initialize Phool Barsao Button
  initPhoolBarsao();

  // 7. Initialize Calendar & RSVP
  initRsvpAndCalendar();
});

/**
 * Mobile-First Card Slider Controller (Horizontal Track - Zero Overlap)
 */
class CardDeckController {
  constructor() {
    this.viewport = document.querySelector('.cards-viewport');
    this.sliderTrack = document.getElementById('cards-slider-track');
    this.cards = document.querySelectorAll('.wedding-card');
    this.dots = document.querySelectorAll('.nav-dot');
    this.prevBtn = document.getElementById('prev-card-btn');
    this.nextBtn = document.getElementById('next-card-btn');
    this.currentCardIndex = 0;
    this.totalCards = this.cards.length;

    // Touch swipe coordinates
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;

    this.init();
  }

  init() {
    if (!this.sliderTrack || this.cards.length === 0) return;

    // Dot indicators click
    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => this.goToCard(idx));
    });

    // Arrow navigation buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevCard());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextCard());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.body.classList.contains('card-revealed')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') this.nextCard();
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') this.prevCard();
      }
    });

    // Mobile touch swipe gestures
    if (this.viewport) {
      this.viewport.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      this.viewport.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.touchEndY = e.changedTouches[0].screenY;
        this.handleSwipe();
      }, { passive: true });
    }

    this.updateTrack();
  }

  handleSwipe() {
    const diffX = this.touchStartX - this.touchEndX;
    const diffY = this.touchStartY - this.touchEndY;
    const threshold = 40;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > threshold) {
        // Swiped Left -> Next Card
        this.nextCard();
      } else if (diffX < -threshold) {
        // Swiped Right -> Previous Card
        this.prevCard();
      }
    }
  }

  goToCard(index) {
    if (index < 0 || index >= this.totalCards || index === this.currentCardIndex) return;
    this.currentCardIndex = index;
    this.updateTrack();

    // Gentle celebratory petal flutter on page turn
    if (window.petalEngine) {
      window.petalEngine.burst(16);
    }
  }

  nextCard() {
    if (this.currentCardIndex < this.totalCards - 1) {
      this.goToCard(this.currentCardIndex + 1);
    } else {
      this.goToCard(0);
    }
  }

  prevCard() {
    if (this.currentCardIndex > 0) {
      this.goToCard(this.currentCardIndex - 1);
    } else {
      this.goToCard(this.totalCards - 1);
    }
  }

  updateTrack() {
    // Smooth horizontal translation of track
    const offset = this.currentCardIndex * 100;
    this.sliderTrack.style.transform = `translateX(-${offset}%)`;

    // Update bottom dot indicators
    this.dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === this.currentCardIndex);
    });

    // Reset scroll position of the active card
    const activeCard = this.cards[this.currentCardIndex];
    if (activeCard) {
      activeCard.scrollTop = 0;
    }
  }
}

/**
 * Real-Time Wedding Countdown Timer
 */
function initCountdownTimer() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  const targetDate = new Date(WEDDING_DATA.weddingDateISO).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minsEl.innerText = '00';
      secsEl.innerText = '00';
      const label = document.getElementById('countdown-status-label');
      if (label) label.innerText = '🌸 शुभ विवाह समारोह चल रहा है! 🌸';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = String(days).padStart(2, '0');
    hoursEl.innerText = String(hours).padStart(2, '0');
    minsEl.innerText = String(minutes).padStart(2, '0');
    secsEl.innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/**
 * Phool Barsao (Shower Petals) Celebration Button
 */
function initPhoolBarsao() {
  const phoolBtn = document.getElementById('phool-barsao-btn');
  if (!phoolBtn) return;

  const blessings = [
    '🌸 सदा सुहागन रहो! 🌸',
    '✨ नव दांपत्य जीवन मंगलमय हो! ✨',
    '🌺 खूब सारा प्यार और आशीष! 🌺',
    '💖 Shubh Vivah! 💖',
    '💐 जुग जुग जियो जोड़ी! 💐',
    '🕊️ Best Wishes & Endless Happiness! 🕊️'
  ];

  phoolBtn.addEventListener('click', () => {
    if (window.petalEngine) {
      window.petalEngine.burst(65);
    }

    if ('vibrate' in navigator) {
      try { navigator.vibrate([20, 30, 20]); } catch (e) {}
    }

    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    showFloatingBlessing(randomBlessing);
  });
}

function showFloatingBlessing(text) {
  const toast = document.createElement('div');
  toast.className = 'blessing-toast animate-float-up';
  toast.innerText = text;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 600);
  }, 2200);
}

/**
 * RSVP & Calendar Integrations
 */
function initRsvpAndCalendar() {
  const waBtn = document.getElementById('whatsapp-rsvp-btn');
  if (waBtn) {
    const message = encodeURIComponent(WEDDING_DATA.rsvp.whatsappMessage);
    const phone = WEDDING_DATA.rsvp.whatsappNumber;
    waBtn.href = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
  }

  const calBtn = document.getElementById('add-calendar-btn');
  if (calBtn) {
    const title = encodeURIComponent(`Wedding: ${WEDDING_DATA.groom.firstName} & ${WEDDING_DATA.bride.firstName} (शुभ विवाह)`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the royal wedding of ${WEDDING_DATA.groom.firstName} & ${WEDDING_DATA.bride.firstName}.\nVenue: ${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);
    const location = encodeURIComponent(`${WEDDING_DATA.venue.name}, ${WEDDING_DATA.venue.address}`);
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20261128T133000Z/20261128T203000Z`;
    calBtn.href = gCalUrl;
  }

  const blessingForm = document.getElementById('guest-blessing-form');
  const blessingsList = document.getElementById('guest-blessings-list');

  if (blessingForm && blessingsList) {
    blessingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('guest-name');
      const msgInput = document.getElementById('guest-message');

      const name = nameInput.value.trim();
      const message = msgInput.value.trim();

      if (!name || !message) return;

      const item = document.createElement('div');
      item.className = 'guest-blessing-card';
      item.innerHTML = `
        <div class="guest-header">
          <span class="guest-icon">🌸</span>
          <strong class="guest-name">${escapeHtml(name)}</strong>
        </div>
        <p class="guest-text">"${escapeHtml(message)}"</p>
      `;

      blessingsList.prepend(item);
      nameInput.value = '';
      msgInput.value = '';

      if (window.petalEngine) {
        window.petalEngine.burst(40);
      }
      showFloatingBlessing(`धन्यवाद ${name}! आपका आशीष प्राप्त हुआ। 🌸`);
    });
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}
