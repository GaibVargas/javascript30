const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const btnRed = document.querySelector('.red');
const btnSplit = document.querySelector('.split');
const btnReset = document.querySelector('.reset');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(err => {
      console.error('Oh, no!', err);
    });
}

function paintToCanvas() {
  putEffect();
  video.addEventListener('canplay', paintToCanvas);
}

let pointer;

function putEffect(cb = null) {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  pointer = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    let pixels = ctx.getImageData(0, 0, width, height);
    if(cb) pixels = cb(pixels);
    ctx.putImageData(pixels, 0, 0)
  }, 16);

  return pointer;
}

function playEffects(cb) {
  clearInterval(pointer);
  pointer = putEffect(cb);
}

function takePhoto() {
  snap.curretTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContent = 'Download image';
  link.innerHTML = `<img src="${data}">`
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = pixels.data[i] + 100; // red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i]; // red
    pixels.data[i + 100] = pixels.data[i + 1]; // green
    pixels.data[i - 150] = pixels.data[i + 2]; // blue
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
btnRed.onclick = () => playEffects(redEffect);
btnSplit.onclick = () => playEffects(rgbSplit);
btnReset.onclick = () => playEffects();
