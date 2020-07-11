// Import stylesheets
import './style.css';

// Get DOM elements 
const imageGalleryOpener = document.querySelector('.open');
const heroImage = document.querySelector('.hero-image');
const modalBackdrop = document.getElementById('modal-backdrop');
const canvas = document.getElementById('canvas');

let interaction;
const ctx = canvas.getContext('2d');
let zoom = 1.2;
let sx = 0, sy = 0;
let image;
let currentX;
let currentY;
let mouseStartX;
let mouseStartY;

let clientWidth = 672, clientHeight = 400;
let sourceImageWidth;
let sourceImageHeight;


// Load and draw image
loadImageOnCanvas();
addEventListeners();


/**
 * @param sx, sy - the top left corner of the canvas 
 */
function loadImageOnCanvas(sx, sy) {
  image = new Image();
  image.src = 'https://images.pexels.com/photos/2113566/pexels-photo-2113566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
 
  image.onload = (() => {
    sourceImageWidth= image.width;
    sourceImageHeight = image.height;
    const sWidth = zoom > 1 ? sourceImageWidth / (zoom) : sourceImageWidth;
    const sHeight = zoom > 1 ? sourceImageHeight / (zoom) : sourceImageHeight;
    sx = 0;
    sy = 0;
    ctx.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, clientWidth, clientHeight); 
    clientWidth = canvas.clientWidth;
    clientHeight = canvas.clientHeight;
  })
}

function drawCanvas(imageParam, sx, sy) {
  const newZoomedInWidth = imageParam.width / zoom;
  const newZoomedInHeight = imageParam.height / zoom;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, sx, sy, image.width / zoom, image.height / zoom, 0, 0, clientWidth, clientHeight);
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
    mouseStartX = event.clientX;
    mouseStartY = event.clientY;
  })

  // Pan Image if zoomed in
  canvas.addEventListener('mousemove', (event) => {
    if (zoom <= 1 || interaction !== 'pan') { return; }
    const mx = (event.clientX - mouseStartX);
    const my = (event.clientY - mouseStartY);

    sx = (sx + mx);
    sy = (sy + my);
  
    drawCanvas(image, sx, sy);
  })

  canvas.addEventListener('mouseup', (event) => {
    interaction = undefined;
  })
}

function toggleZoom() { 
  if (zoom > 1) {
    zoom = 1;
  } else {
    zoom += 0.5; // increase zoom
  }
}

