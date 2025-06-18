const hearts = [];

// creăm un container special în spate
const heartContainer = document.createElement('div');
heartContainer.style.position = 'fixed';
heartContainer.style.top = 0;
heartContainer.style.left = 0;
heartContainer.style.width = '100%';
heartContainer.style.height = '100%';
heartContainer.style.pointerEvents = 'none'; // ca să nu blocheze click-urile
heartContainer.style.zIndex = '-1'; // în spate de tot
document.body.appendChild(heartContainer);

function createHeart(x = null, y = null) {
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.position = 'absolute';
  heart.style.fontSize = `${Math.random() * 20 + 15}px`;
  heart.style.pointerEvents = 'auto';
  heart.style.userSelect = 'none';
  heart.style.opacity = 0.7;

  heart.style.left = x !== null ? x + 'px' : Math.random() * window.innerWidth + 'px';
  heart.style.top = y !== null ? y + 'px' : Math.random() * window.innerHeight + 'px';

  heart.speedY = 0.3 + Math.random() * 0.5;
  heart.amplitude = 10 + Math.random() * 15;
  heart.angle = Math.random() * Math.PI * 2;
  heart.baseX = parseFloat(heart.style.left);
  heart.baseY = parseFloat(heart.style.top);
  heart.isHovered = false;

  heart.addEventListener('mouseenter', () => {
    heart.isHovered = true;
    heart.style.transition = 'transform 0.3s ease';
  });
  heart.addEventListener('mouseleave', () => {
    heart.isHovered = false;
    heart.style.transition = 'transform 0.3s ease';
  });

  heartContainer.appendChild(heart); // adăugăm în containerul special
  hearts.push(heart);
  return heart;
}

function animate() {
  hearts.forEach(heart => {
    heart.angle += 0.05;
    heart.baseY -= heart.speedY;

    if (heart.baseY < -50) {
      heart.baseY = window.innerHeight + 50;
      heart.baseX = Math.random() * window.innerWidth;
    }

    const offsetX = Math.sin(heart.angle) * heart.amplitude;

    if (heart.isHovered) {
      heart.style.transform = `translate(${offsetX}px, 0) rotate(${Math.sin(heart.angle) * 30}deg) scale(1.5)`;
    } else {
      heart.style.transform = `translate(${offsetX}px, 0) rotate(${Math.sin(heart.angle) * 15}deg) scale(1)`;
    }

    heart.style.left = heart.baseX + offsetX + 'px';
    heart.style.top = heart.baseY + 'px';
  });

  requestAnimationFrame(animate);
}

for (let i = 0; i < 80; i++) {
  createHeart();
}

animate();

window.addEventListener('click', e => {
  createHeart(e.clientX, e.clientY);
});
