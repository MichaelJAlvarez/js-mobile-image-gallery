// Import stylesheets
import './style.css';

let interaction;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let zoom = 1.2;
let sx, sy;
let image;
let currentX;
let currentY;
let mouseStartX;
let mouseStartY;
const imageGalleryOpener = document.querySelector('.open');
const heroImage = document.querySelector('.hero-image');
const modalBackdrop = document.getElementById('modal-backdrop');
let clientWidth = 672, clientHeight = 400;
let sourceImageWidth;
let sourceImageHeight;

loadImageOnCanvas();
addEventListeners();

function toggleZoom() { 
  if (zoom > 1) {
    zoom = 1;
  } else {
    zoom += 0.5; // increase zoom
  }
}

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
  const newZoomedInWidth = img.width / zoom;
  const newZoomedInHeight = img.height / zoom;

  // Take midpoint of visible image, and calculate new top left corner (new sx, sy values)
  const newSx = beforeZoomMidpointX - (newZoomedInWidth / 2);
  const newSy = beforeZoomMidpointY - (newZoomedInHeight / 2);
  ctx.drawImage(imageParam, sx, sy )
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

  canvas.addEventListener('mouseup', (event) => {
    interaction = undefined;
  })

  // Pan Image if zoomed in
  canvas.addEventListener('mousemove', (event) => {
    if (zoom <= 1 || interaction !== 'pan') { return; }
    currentX = event.offsetX;
    currentY = event.offsetY;
    const mx = (currentX - mouseStartX);
    const my = (currentY - mouseStartY);

    sx = (sx + mx);
    sy = (sy + my);
    this.drawCanvas(image, sx, sy);
    console.log(`moved x: ${mx}, and moved y: ${my}`);
    // 
    
  })

  // Zoom
  canvas.addEventListener('mousewheel', (event) => {
    
  })
}

