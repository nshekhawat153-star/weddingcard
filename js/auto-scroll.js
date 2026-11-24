/**
 * Luxury Auto-Scroll Controller for Wedding Invitation
 * - Delays start so user can admire the hero scene & animated vintage car
 * - Smooth cinematic auto-scroll at comfortable reading speed
 * - Bypasses CSS scroll-behavior: smooth to prevent browser stutter/freezing
 * - Seamlessly pauses on ANY user interaction (touch, drag, wheel, swipe)
 * - Automatically resumes after 2.5s idle when user lets go
 * - Floating toggle button for instant manual control
 */

(function () {
  'use strict';

  let isAutoScrolling = false;
  let userInteracting = false;
  let resumeTimeout = null;
  let animationFrameId = null;
  let accumulatedScroll = 0;

  const SCROLL_SPEED = 1.35; // Pixels per frame (~80px/sec at 60fps) - smooth & readable
  const INITIAL_DELAY_MS = 1800; // Time to view hero before gliding
  const RESUME_IDLE_MS = 2500; // Resume after user stops touching/scrolling

  const btn = document.getElementById('auto-scroll-btn');
  const btnText = document.getElementById('auto-scroll-text');

  function updateButtonUI() {
    if (!btn) return;
    if (isAutoScrolling && !userInteracting) {
      btn.classList.add('is-scrolling');
      if (btnText) btnText.textContent = 'Auto Scroll: ON';
    } else {
      btn.classList.remove('is-scrolling');
      if (btnText) btnText.textContent = 'Auto Scroll: PAUSED';
    }
  }

  function getScrollTop() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  function autoScrollStep() {
    if (!isAutoScrolling || userInteracting) return;

    const maxScroll = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;

    const currentScroll = getScrollTop();

    if (currentScroll >= maxScroll - 5) {
      // Reached the end
      stopAutoScroll();
      return;
    }

    // Keep accumulator in sync if page jumped
    if (Math.abs(accumulatedScroll - currentScroll) > 15) {
      accumulatedScroll = currentScroll;
    }

    accumulatedScroll += SCROLL_SPEED;

    // Use instant behavior to prevent native CSS smooth-scroll from interrupting
    window.scrollTo({
      top: accumulatedScroll,
      left: 0,
      behavior: 'instant'
    });

    animationFrameId = requestAnimationFrame(autoScrollStep);
  }

  function startAutoScroll() {
    accumulatedScroll = getScrollTop();
    isAutoScrolling = true;
    userInteracting = false;
    document.documentElement.style.scrollBehavior = 'auto';
    updateButtonUI();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(autoScrollStep);
  }

  function pauseAutoScroll(scheduleResume = true) {
    userInteracting = true;
    cancelAnimationFrame(animationFrameId);
    updateButtonUI();

    clearTimeout(resumeTimeout);
    if (scheduleResume && isAutoScrolling) {
      resumeTimeout = setTimeout(() => {
        userInteracting = false;
        accumulatedScroll = getScrollTop();
        if (isAutoScrolling) {
          updateButtonUI();
          animationFrameId = requestAnimationFrame(autoScrollStep);
        }
      }, RESUME_IDLE_MS);
    }
  }

  function stopAutoScroll() {
    isAutoScrolling = false;
    userInteracting = false;
    clearTimeout(resumeTimeout);
    cancelAnimationFrame(animationFrameId);
    document.documentElement.style.scrollBehavior = '';
    updateButtonUI();
  }

  function toggleAutoScroll() {
    clearTimeout(resumeTimeout);
    if (isAutoScrolling && !userInteracting) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  }

  // User interactions: immediately pause when user touches, wheels, or drags
  const pauseEvents = ['touchstart', 'touchmove', 'wheel', 'pointerdown', 'keydown', 'mousedown'];
  pauseEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      if (isAutoScrolling) {
        pauseAutoScroll(false); // Pause without timer while finger is on screen
      }
    }, { passive: true });
  });

  // When user releases finger or mouse, start the resume countdown
  const resumeEvents = ['touchend', 'touchcancel', 'pointerup', 'pointercancel', 'mouseup'];
  resumeEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      accumulatedScroll = getScrollTop();
      if (isAutoScrolling) {
        pauseAutoScroll(true); // Schedule resume after idle
      }
    }, { passive: true });
  });

  // Track manual scroll to update accumulator
  window.addEventListener('scroll', () => {
    if (userInteracting) {
      accumulatedScroll = getScrollTop();
    }
  }, { passive: true });

  // Handle visibility change (tab switch / screen lock)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else if (isAutoScrolling && !userInteracting) {
      accumulatedScroll = getScrollTop();
      animationFrameId = requestAnimationFrame(autoScrollStep);
    }
  });

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleAutoScroll();
    });
  }

  // Automatic initiation
  function initAutoScroll() {
    setTimeout(() => {
      startAutoScroll();
    }, INITIAL_DELAY_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAutoScroll);
  } else {
    initAutoScroll();
  }

})();
