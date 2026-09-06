/**
 * Royal Envelope Unfolding & Wax Seal Breaking Animation
 * Handles:
 * - 3D envelope perspective opening
 * - Golden wax seal breaking animation
 * - Petal burst trigger & audio start
 * - Seamless transition into the Wedding Card Deck
 */

class RoyalEnvelope {
  constructor(options = {}) {
    this.envelopeWrapper = document.getElementById('envelope-screen');
    this.waxSeal = document.getElementById('wax-seal');
    this.envelopeFlap = document.getElementById('envelope-flap');
    this.mainCardDeck = document.getElementById('wedding-card-deck');
    this.onOpenCallback = options.onOpen || null;
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.waxSeal) return;

    // Tap on wax seal or anywhere on the envelope prompt
    this.waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      this.openEnvelope();
    });

    const openTriggerBtn = document.getElementById('open-invitation-btn');
    if (openTriggerBtn) {
      openTriggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openEnvelope();
      });
    }

    // Floating button to view envelope again if desired
    const viewEnvelopeBtn = document.getElementById('view-envelope-btn');
    if (viewEnvelopeBtn) {
      viewEnvelopeBtn.addEventListener('click', () => {
        this.resetEnvelope();
      });
    }
  }

  openEnvelope() {
    if (this.isOpen) return;
    this.isOpen = true;

    // Mobile haptic vibration if available
    if ('vibrate' in navigator) {
      try { navigator.vibrate([30, 50, 40]); } catch (e) {}
    }

    // Step 1: Wax seal crack & burst
    this.waxSeal.classList.add('seal-breaking');

    // Step 2: Unfold envelope top flap in 3D
    setTimeout(() => {
      if (this.envelopeFlap) {
        this.envelopeFlap.classList.add('flap-open');
      }
      this.envelopeWrapper.classList.add('envelope-opening');

      // Trigger celebratory petal burst
      if (window.petalEngine) {
        window.petalEngine.burst(50);
      }
    }, 450);

    // Step 3: Card slides upwards out of envelope
    setTimeout(() => {
      this.envelopeWrapper.classList.add('card-sliding-out');
    }, 1000);

    // Step 4: Envelope fades into background, activating the interactive Card Deck
    setTimeout(() => {
      this.envelopeWrapper.classList.add('envelope-dismissed');
      if (this.mainCardDeck) {
        this.mainCardDeck.classList.add('deck-active');
      }
      document.body.classList.add('card-revealed');

      if (this.onOpenCallback) {
        this.onOpenCallback();
      }
    }, 1800);
  }

  resetEnvelope() {
    this.isOpen = false;
    if (this.mainCardDeck) {
      this.mainCardDeck.classList.remove('deck-active');
    }
    document.body.classList.remove('card-revealed');
    this.envelopeWrapper.classList.remove('envelope-dismissed', 'card-sliding-out', 'envelope-opening');
    if (this.envelopeFlap) {
      this.envelopeFlap.classList.remove('flap-open');
    }
    this.waxSeal.classList.remove('seal-breaking');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

window.RoyalEnvelope = RoyalEnvelope;
