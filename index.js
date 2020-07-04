// Import stylesheets
import './style.css';

let interaction;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let zoom = 1.2;
let currentX;
let currentY;
let startX;
let startY;
const imageGalleryOpener = document.querySelector('.open');
const heroImage = document.querySelector('.hero-image');
const modalBackdrop = document.getElementById('modal-backdrop');
let clientWidth = 672, clientHeight = 400;
let sourceImageWidth;
let sourceImageHeight;

redrawCanvas();
addEventListeners();

function toggleZoom() { 
  if (zoom > 1) {
    zoom = 1;
  } else {
    zoom += 0.5; // increase zoom
  }
}

function moveImage() {

}

/**
 * @param sx, sy - the top left corner of the canvas 
 */
function redrawCanvas(sx, sy) {
  const image = new Image();
  image.src = 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
 
  image.onload = (() => {
    sourceImageWidth= image.width;
    sourceImageHeight = image.height;
    const sWidth = zoom > 1 ? sourceImageWidth / (zoom) : sourceImageWidth;
    const sHeight = zoom > 1 ? sourceImageHeight / (zoom) : sourceImageHeight;
    ctx.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, clientWidth, clientHeight); 
    clientWidth = canvas.clientWidth;
    clientHeight = canvas.clientHeight;
  })
}

function addEventListeners() {
  // Close modal
  modalBackdrop.addEventListener('click', () => {
    modalBackdrop.classList.remove('show');
  })

  // Open modal
  imageGalleryOpener.addEventListener('click', (event) => {
    modalBackdrop.classList.add('show');
  })

  // Set initial clientX starting point to calculate distance moved later on..
  canvas.addEventListener('mousedown', (event) => {
    interaction = 'pan';
    startX = event.clientX;
    startY = event.clientY;
  })

  canvas.addEventListener('mouseup', (event) => {
    interaction = undefined;
  })

  // Pan Image if zoomed in
  canvas.addEventListener('mousemove', (event) => {
    if (zoom <= 1 || interaction !== 'pan') { return; }
    currentX = event.offsetX;
    currentY = event.offsetY;
    const mx = (currentX - startX);
    const my = (currentY - startY);
    console.log(`moved x: ${mx}, and moved y: ${my}`);
  })

  // Zoom
  canvas.addEventListener('mousewheel', (event) => {
    
  })
}

