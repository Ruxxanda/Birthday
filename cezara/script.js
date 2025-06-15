const hearts = [];

function createHeart(x = null, y = null) {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'fixed';
  heart.style.fontSize = `${Math.random() * 20 + 15}px`;
  heart.style.pointerEvents = 'auto'; // să poată primi hover
  heart.style.userSelect = 'none';
  heart.style.opacity = 0.7;
  
  // poziționare aleatorie sau fixă dacă primește coordonate
  heart.style.left = x !== null ? x + 'px' : Math.random() * window.innerWidth + 'px';
  heart.style.top = y !== null ? y + 'px' : Math.random() * window.innerHeight + 'px';
  
  // animație mai lentă inițială
  heart.speedY = 0.3 + Math.random() * 0.5;
  heart.amplitude = 10 + Math.random() * 15;
  heart.angle = Math.random() * Math.PI * 2;
  heart.baseX = parseFloat(heart.style.left);
  heart.baseY = parseFloat(heart.style.top);
  heart.isHovered = false;
  document.body.appendChild(heart);

  // hover: crește și învârte tare
  heart.addEventListener('mouseenter', () => {
    heart.isHovered = true;
    heart.style.transition = 'transform 0.3s ease';
  });
  heart.addEventListener('mouseleave', () => {
    heart.isHovered = false;
    heart.style.transition = 'transform 0.3s ease';
  });

  hearts.push(heart);
  return heart;
}

function animate() {
  hearts.forEach(heart => {
    heart.angle += 0.05; // mai rapid pentru toate
    heart.baseY -= heart.speedY;

    // reapare jos dacă iese sus
    if (heart.baseY < -50) {
      heart.baseY = window.innerHeight + 50;
      heart.baseX = Math.random() * window.innerWidth;
    }

    const offsetX = Math.sin(heart.angle) * heart.amplitude;

    if (heart.isHovered) {
      // marește și învârte tare când e hover
      heart.style.transform = `translate(${offsetX}px, 0) rotate(${Math.sin(heart.angle) * 30}deg) scale(1.5)`;
    } else {
      // normal
      heart.style.transform = `translate(${offsetX}px, 0) rotate(${Math.sin(heart.angle) * 15}deg) scale(1)`;
    }

    heart.style.left = heart.baseX + offsetX + 'px';
    heart.style.top = heart.baseY + 'px';
  });

  requestAnimationFrame(animate);
}

// creează inimioarele inițiale
for (let i = 0; i < 80; i++) {
  createHeart();
}

// animare continuă
animate();

// la click, adaugă inimioară nouă la poziția cursorului
window.addEventListener('click', e => {
  createHeart(e.clientX, e.clientY);
});











