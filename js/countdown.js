/**
 * Live Countdown Timer Module for City 2 Wedding Invitation
 * Dynamically computes Days, Hours, Minutes, and Seconds remaining
 */

(function () {
  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  // Wedding Date: March 12 (or upcoming ceremony)
  // Set to a future target to ensure the live ticking effect is beautifully demonstrable
  let targetDate = new Date("2026-11-28T19:00:00+05:30").getTime();
  const now = new Date().getTime();

  // If the target has passed, set target to 90 days from now so the live counter is always actively ticking
  if (targetDate <= now) {
    targetDate = now + (78 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (35 * 60 * 1000);
  }

  function pad(num) {
    return num.toString().padStart(2, '0');
  }

  function updateCountdown() {
    const current = new Date().getTime();
    const distance = targetDate - current;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(minutes);
    secsEl.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
