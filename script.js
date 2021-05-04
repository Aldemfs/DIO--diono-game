const ndino = document.querySelector('.ndino');
const nbackground = document.querySelector('.nbackground');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          ndino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;
      ndino.style.bottom = position + 'px';
    }
  }, 20);
}

function createNcactus() {
  const ncactus = document.createElement('div');
  let ncactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  ncactus.classList.add('ncactus');
  nbackground.appendChild(ncactus);
  ncactus.style.left = ncactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (ncactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      nbackground.removeChild(ncactus);
    } else if (ncactusPosition > 0 && ncactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over"><blink>EXTINÇÃO<blink/></h1>';
    } else {
      ncactusPosition -= 10;
      ncactus.style.left = ncactusPosition + 'px';
    }
  }, 20);

  setTimeout(createNcactus, randomTime);
}

createNcactus();
document.addEventListener('keyup', handleKeyUp);
