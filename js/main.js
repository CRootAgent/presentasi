// Presentasi Spasial 3D CRootAgent
// Engine: crootss (https://crootss.if.co.id)

import { croot } from 'https://cdn.jsdelivr.net/gh/crootss/crootss@v0.4.0/croot.min.js';

document.addEventListener('DOMContentLoaded', () => {
  const deck = croot('.croot-viewport');
  const counterEl = document.getElementById('hud-counter');
  const btnPrev = document.getElementById('hud-prev');
  const btnNext = document.getElementById('hud-next');
  const btnOverview = document.getElementById('hud-overview');

  const totalSteps = 9;

  // Update HUD step counter
  function updateCounter(step) {
    if (counterEl) {
      counterEl.textContent = `${step} / ${totalSteps}`;
    }
  }

  // Hook HUD controls
  if (btnPrev) {
    btnPrev.addEventListener('click', () => deck.prev());
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => deck.next());
  }
  if (btnOverview) {
    btnOverview.addEventListener('click', () => deck.overview());
  }

  // Handle deck events
  const viewport = document.querySelector('.croot-viewport');
  if (viewport) {
    viewport.addEventListener('croot:enter', (e) => {
      const node = e.detail?.node;
      const step = node?.getAttribute('data-croot-step') || '1';
      updateCounter(step);
    });

    viewport.addEventListener('croot:overview', () => {
      updateCounter(1);
    });
  }

  // Clickable cards in concept map
  document.querySelectorAll('.map-card[data-croot-target]').forEach(card => {
    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-croot-target');
      if (targetId) {
        deck.goto(targetId);
      }
    });
  });
});
