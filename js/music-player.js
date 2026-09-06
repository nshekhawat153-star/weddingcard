/**
 * Music Player Module for City 2 Wedding Invitation
 * Handles background music playback, user interaction unlock, and visualizer state
 */

(function () {
  const audio = document.getElementById('bg-soundtrack');
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const audioContainer = document.getElementById('audio-container');
  const iconMuted = document.getElementById('audio-icon-muted');
  const iconPlaying = document.getElementById('audio-icon-playing');
  const eqBars = document.getElementById('equalizer-bars');

  if (!audio || !toggleBtn) return;

  let isPlaying = false;
  let hasInteracted = false;

  function updateVisuals(playing) {
    isPlaying = playing;
    if (playing) {
      toggleBtn.classList.add('audio-playing');
      if (eqBars) eqBars.classList.add('eq-playing');
      if (iconMuted) iconMuted.style.display = 'none';
      if (iconPlaying) iconPlaying.style.display = 'block';
    } else {
      toggleBtn.classList.remove('audio-playing');
      if (eqBars) eqBars.classList.remove('eq-playing');
      if (iconMuted) iconMuted.style.display = 'block';
      if (iconPlaying) iconPlaying.style.display = 'none';
    }
  }

  function playAudio() {
    audio.play().then(() => {
      updateVisuals(true);
    }).catch(err => {
      console.log('Autoplay deferred until user interaction:', err);
      updateVisuals(false);
    });
  }

  function pauseAudio() {
    audio.pause();
    updateVisuals(false);
  }

  function toggleAudio(e) {
    if (e) e.stopPropagation();
    if (audio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  toggleBtn.addEventListener('click', toggleAudio);

  // Attempt autoplay immediately
  playAudio();

  // Browsers block autoplay with sound without prior user interaction.
  // Unlock audio on the first click, tap, or touch anywhere on the page if paused.
  function unlockAudioOnFirstInteraction() {
    if (hasInteracted) return;
    hasInteracted = true;
    if (audio.paused) {
      playAudio();
    }
    ['click', 'touchstart', 'scroll'].forEach(evt => {
      document.removeEventListener(evt, unlockAudioOnFirstInteraction);
    });
  }

  ['click', 'touchstart', 'scroll'].forEach(evt => {
    document.addEventListener(evt, unlockAudioOnFirstInteraction, { once: true, passive: true });
  });
})();
