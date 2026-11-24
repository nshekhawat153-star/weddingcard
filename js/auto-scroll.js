/**
 * Luxury Auto-Scroll Controller for Wedding Invitation
 * - Delays start so user can admire the hero scene & animated car
 * - Smooth slow cinematic auto-scroll at comfortable reading speed
 * - Automatically pauses on ANY user interaction (touch, wheel, drag, key)
 * - Seamlessly resumes after idle, or user can toggle with the floating pill
 */

(function () {
  'use strict';

  let isAutoScrolling = false;
  let userInteracting = false;
  let resumeTimeout = null;
  let animationFrameId = null;
  let hasStarted = false;

  const SCROLL_SPEED = 0.8; // pixels per frame (smooth cinematic glide)
  const INITIAL_DELAY_MS = 3200; // time to view the hero section first
  const RESUME_IDLE_MS = 4000; // resume after user stops scrolling

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

  function autoScrollStep() {
    if (!isAutoScrolling || userInteracting) return;

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY || window.pageYOffset;

    if (currentScroll >= maxScroll - 5) {
      // Reached the end (countdown section)
      stopAutoScroll();
      return;
    }

    window.scrollBy(0, SCROLL_SPEED);
    animationFrameId = requestAnimationFrame(autoScrollStep);
  }

  function startAutoScroll() {
    if (isAutoScrolling && !userInteracting) return;
    isAutoScrolling = true;
    userInteracting = false;
    updateButtonUI();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(autoScrollStep);
  }

  function pauseAutoScroll(scheduleResume = true) {
    userInteracting = true;
    cancelAnimationFrame(animationFrameId);
    updateButtonUI();

    clearTimeout(resumeTimeout);
    if (scheduleResume) {
      resumeTimeout = setTimeout(() => {
        userInteracting = false;
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
    updateButtonUI();
  }

  function toggleAutoScroll() {
    clearTimeout(resumeTimeout);
    if (isAutoScrolling && !userInteracting) {
      isAutoScrolling = false;
      userInteracting = false;
      cancelAnimationFrame(animationFrameId);
    } else {
      isAutoScrolling = true;
      userInteracting = false;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(autoScrollStep);
    }
    updateButtonUI();
  }

  // User interaction listeners: pause immediately when user touches or scrolls
  const interactionEvents = ['touchstart', 'touchmove', 'wheel', 'pointerdown', 'keydown', 'mousedown'];
  interactionEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      if (isAutoScrolling) {
        pauseAutoScroll(true);
      }
    }, { passive: true });
  });

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAutoScroll();
    });
  }

  // Initial delay: First let the guest enjoy the hero palace scene
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      hasStarted = true;
      startAutoScroll();
    }, INITIAL_DELAY_MS);
  });
})();
