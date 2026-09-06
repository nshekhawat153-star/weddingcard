/**
 * Staggered Intersection Observer Animations for City 2
 * Reveals elements with smooth spring easing as user scrolls down
 * Triggers driving animation for the sunset footer vintage car
 */

(function () {
  const elements = document.querySelectorAll('.appear-element');
  const footerCar = document.getElementById('footer-car-img');
  const countdownSection = document.getElementById('countdown');

  if ('IntersectionObserver' in window) {
    // 1. General Elements Observer
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    elements.forEach(el => observer.observe(el));

    // 2. Footer Car Dedicated Driving Motion Observer
    if (footerCar && countdownSection) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            footerCar.classList.add('car-animated-in');
          }
        });
      }, {
        root: null,
        threshold: 0.15
      });

      footerObserver.observe(countdownSection);
    }
  } else {
    // Fallback if IntersectionObserver not supported
    elements.forEach(el => el.classList.add('is-visible'));
    if (footerCar) footerCar.classList.add('car-animated-in');
  }
})();
