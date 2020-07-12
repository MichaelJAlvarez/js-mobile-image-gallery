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
let maxZoom = 3.14;
let minZoom = 1;
let sx = 0, sy = 0;
let image;
let currentX;
let currentY;
let mouseStartX;
let mouseStartY;

let canvasWidth = 672, canvasHeight = 400;
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
    const sWidth = zoom > 1 ? image.width / (zoom) : image.width;
    const sHeight = zoom > 1 ? image.height / (zoom) : redrawImage.height;
    sx = 0;
    sy = 0;
    ctx.drawImage(image, 0, 0, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight); 
    canvasWidth = canvas.clientWidth;
    canvasHeight = canvas.clientHeight;
  })
}

function redrawImage(sx, sy) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, sx, sy, image.width / zoom, image.height / zoom, 0, 0, canvasWidth, canvasHeight);
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
    const mx = (mouseStartX - event.clientX);
    const my = (mouseStartY - event.clientY);

    sx = (sx + (mx / (zoom * zoom)));
    sy = (sy + (my / (zoom * zoom)));
  
    redrawImage(sx, sy);
  })

  canvas.addEventListener('mouseup', (event) => {
    interaction = undefined;
  })

  canvas.addEventListener('mousewheel', (event) => {
    // Prevent zoom on rest of page
    event.preventDefault();
    event.stopPropagation();

    const beforeZoomMidpointX = sx + (image.width / (zoom * 2));
		const beforeZoomMidpointY = sy + (image.height / (zoom * 2));
    zoom = zoom + (-event.deltaY / 22);

    if (zoom > maxZoom) {
      zoom = maxZoom;
    }

    if (zoom < minZoom) {
      zoom = minZoom;
    }

    sx = beforeZoomMidpointX - (image.width / (zoom * 2));
    sy = beforeZoomMidpointY -  (image.height / (zoom * 2));
    redrawImage(sx, sy);
  })
}



function toggleZoom() { 
  if (zoom > 1) {
    zoom = 1;
  } else {
    zoom += 0.5; // increase zoom
  }
}

