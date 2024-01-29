import { createPopup } from 'https://unpkg.com/@picmo/popup-picker@latest/dist/index.js?module';

const trigger = document.getElementById('trigger');
const input = document.getElementById('message');

const picker = createPopup({
  showCloseButton: false,
  showRecents: false,
  maxRecents: 0,
  emojiSize: '1.6rem',
  emojiVersion: 14.0,
  emojisPerRow: 9,
  showPreview: false,
  showVariants: false 
}, {
  referenceElement: trigger,
  triggerElement: trigger,
  position: 'top-end'
});

trigger.addEventListener('click', () => picker.toggle());

picker.addEventListener('emoji:select', (s) => input.value += s.emoji);
