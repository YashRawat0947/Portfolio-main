import { useEffect, useRef, useCallback } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  const PARTICLE_COUNT = 140;
  const MOUSE_RADIUS = 130;
  const MOUSE_FORCE = 0.6;
  const CONNECTION_DIST = 110;
  const COLORS = ['#00f5ff', '#7c3aed', '#a855f7', '#00ff88', '#0099cc'];

  const createParticle = useCallback((canvas) => {
    const colorSet = [
      { r: 0, g: 245, b: 255 },   // cyan
      { r: 124, g: 58, b: 237 },  // purple
      { r: 0, g: 255, b: 136 },   // green
      { r: 0, g: 153, b: 204 },   // blue-cyan
    ];
    const color = colorSet[Math.floor(Math.random() * colorSet.length)];
    const alpha = 0.3 + Math.random() * 0.5;

    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      baseVx: (Math.random() - 0.5) * 0.4,
      baseVy: (Math.random() - 0.5) * 0.4,
      radius: 1.2 + Math.random() * 2.2,
      color,
      alpha,
      baseAlpha: alpha,
      pulseOffset: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.02,
    };
  }, []);

  const initParticles = useCallback((canvas) => {
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas)
    );
  }, [createParticle, PARTICLE_COUNT]);

  const drawGlowParticle = useCallback((ctx, p, time) => {
    const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.15;
    const r = p.radius + pulse;
    const a = Math.min(1, p.alpha + pulse * 0.3);

    // Outer glow
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
    grd.addColorStop(0, `rgba(${p.color.r},${p.color.g},${p.color.b},${a})`);
    grd.addColorStop(0.4, `rgba(${p.color.r},${p.color.g},${p.color.b},${a * 0.3})`);
    grd.addColorStop(1, `rgba(${p.color.r},${p.color.g},${p.color.b},0)`);

    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // Core particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color.r},${p.color.g},${p.color.b},${a})`;
    ctx.shadowColor = `rgb(${p.color.r},${p.color.g},${p.color.b})`;
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }, []);

  const drawConnection = useCallback((ctx, p1, p2) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > CONNECTION_DIST) return;

    const strength = 1 - dist / CONNECTION_DIST;
    const alpha = strength * 0.35;

    // Blend colors between two particles
    const r = Math.round((p1.color.r + p2.color.r) / 2);
    const g = Math.round((p1.color.g + p2.color.g) / 2);
    const b = Math.round((p1.color.b + p2.color.b) / 2);

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth = strength * 1.5;
    ctx.stroke();
  }, [CONNECTION_DIST]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time++;

      const { x: mx, y: my } = mouseRef.current;

      // Update and draw particles
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion — smooth falloff
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS);
          const smoothForce = force * force * MOUSE_FORCE;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * smoothForce;
          p.vy += Math.sin(angle) * smoothForce;

          // Brighten nearby particles
          p.alpha = Math.min(1, p.baseAlpha + force * 0.4);
        } else {
          p.alpha += (p.baseAlpha - p.alpha) * 0.04;
        }

        // Dampen velocity back to base
        p.vx += (p.baseVx - p.vx) * 0.03;
        p.vy += (p.baseVy - p.vy) * 0.03;

        // Speed limit
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3;
          p.vy = (p.vy / speed) * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        drawGlowParticle(ctx, p, time);
      }

      // Draw connections
      ctx.save();
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          drawConnection(ctx, particles[i], particles[j]);
        }
      }
      ctx.restore();

      // Mouse interaction glow ring
      if (mx > 0 && my > 0) {
        const pulse = Math.sin(time * 0.05) * 0.15 + 0.85;
        const ringGrd = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * pulse);
        ringGrd.addColorStop(0, 'rgba(0,245,255,0.04)');
        ringGrd.addColorStop(0.6, 'rgba(0,245,255,0.02)');
        ringGrd.addColorStop(1, 'rgba(0,245,255,0)');
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS * pulse, 0, Math.PI * 2);
        ctx.fillStyle = ringGrd;
        ctx.fill();

        // Ring border
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS * pulse * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,245,255,${0.08 * pulse})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles, drawGlowParticle, drawConnection]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
};

export default ParticleBackground;
