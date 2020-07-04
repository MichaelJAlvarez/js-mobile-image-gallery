// Import stylesheets
import './style.css';

// Write Javascript code!
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let zoom = 1;
let currentX;
let currentY;
const imageGalleryOpener = document.querySelector('.open');
const heroImage = document.querySelector('.hero-image');
const modalBackdrop = document.getElementById('modal-backdrop');

redrawCanvas();
addEventListeners();

function toggleZoom() { 
  if (zoom > 1) {
    zoom = 1;
  } else {
    zoom += 0.5; // increase zoom by 20%
  }
}

function moveImage() {

}
// <img id="herothumb" class="hero-image" src="https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" width="400" height="238">
/**
 * @param sx, sy - the top left corner of the canvas 
 */
function redrawCanvas(sx, sy) {
  const image = new Image();
  image.src = 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

  image.onload = (() => {
    //  width: 2250px;
    // height: 1500px;
    const srcWidth = 2250;
    const srcHeight = 1500;
    const sWidth = srcWidth / (zoom * 2);
    const sHeight = srcWidth / (zoom * 2);
     ctx.drawImage(image, 0, 0, (srcWidth / zoom), (srcHeight  / zoom), 0, 0, 840, 500)
  })
  
}

function addEventListeners() {
  modalBackdrop.addEventListener('click', () => {
    modalBackdrop.classList.remove('show');
  })

  imageGalleryOpener.addEventListener('click', () => {
    toggleZoom();
    modalBackdrop.classList.add('show');
  })

  heroImage.addEventListener('mouseover', (event) => {
    currentX = event.offsetX;
    currentY = event.offsetY;
  })

  heroImage.addEventListener('mousewheel', (event) => {
    
  })
}

