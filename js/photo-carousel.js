/**
 * Photo Carousel Slider for 'Meet the Bride and Groom'
 * Supports Previous/Next buttons, Indicator Dots, Touch Swipe, and Smooth Transitions
 */

(function () {
  const slides = document.querySelectorAll('.gallery-slide');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicators = document.querySelectorAll('.indicator-dot');
  const viewport = document.querySelector('.carousel-viewport');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.remove('active');
    }

    currentIndex = (index + totalSlides) % totalSlides;

    slides[currentIndex].classList.add('active');
    if (indicators[currentIndex]) {
      indicators[currentIndex].classList.add('active');
    }
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      resetAutoSlide();
    });
  }

  indicators.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoSlide();
    });
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoSlide();
    }
  }

  // Auto-advance every 4.5 seconds
  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 4500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  startAutoSlide();
})();
