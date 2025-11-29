// Subtle parallax based on mouse to enhance top-view depth
(function () {
  const svg = document.querySelector('.scene');
  if (!svg) return;

  let raf = null;
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  function onMove(e) {
    const rect = svg.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
    const dy = (e.clientY - cy) / rect.height;
    targetX = dx * 6; // degrees
    targetY = -dy * 6;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick() {
    // ease
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    svg.style.transform = `perspective(1200px) rotateX(${curY}deg) rotateY(${curX}deg)`;
    if (Math.abs(targetX - curX) > 0.01 || Math.abs(targetY - curY) > 0.01) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  window.addEventListener('mousemove', onMove, { passive: true });
})();
