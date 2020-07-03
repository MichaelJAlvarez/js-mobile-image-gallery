// Import stylesheets
import './style.css';

// Write Javascript code!
const imageGalleryOpener = document.querySelector('.open');

const modalBackdrop = document.getElementById('modal-backdrop');

modalBackdrop.addEventListener('click', () => {
  modalBackdrop.classList.remove('show');
})

imageGalleryOpener.addEventListener('click', () => {
  modalBackdrop.classList.add('show');
})