import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  type: 'flower' | 'leaf' | 'sparkle';
  color: string;
  swaySpeed: number;
  swayOffset: number;
}

export const FloatingFlowers: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 22; // Low count for non-intrusive experience

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Helper to draw a traditional South Indian Marigold flower
    const drawMarigold = (c: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      
      const petals = 6;
      c.fillStyle = '#FF9800'; // Deep Orange petal base
      for (let i = 0; i < petals; i++) {
        c.beginPath();
        c.arc(r * 0.7 * Math.cos((i * Math.PI * 2) / petals), r * 0.7 * Math.sin((i * Math.PI * 2) / petals), r * 0.6, 0, Math.PI * 2);
        c.fill();
      }
      
      c.fillStyle = '#FBC02D'; // Yellow center/inner petals
      for (let i = 0; i < petals; i++) {
        c.beginPath();
        c.arc(r * 0.4 * Math.cos((i * Math.PI * 2) / petals + Math.PI / petals), r * 0.4 * Math.sin((i * Math.PI * 2) / petals + Math.PI / petals), r * 0.4, 0, Math.PI * 2);
        c.fill();
      }
      
      // Center disc
      c.beginPath();
      c.arc(0, 0, r * 0.3, 0, Math.PI * 2);
      c.fillStyle = '#E65100';
      c.fill();
      c.restore();
    };

    // Helper to draw a Mango leaf
    const drawLeaf = (c: CanvasRenderingContext2D, x: number, y: number, r: number, angle: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(angle);
      c.beginPath();
      c.fillStyle = '#2E7D32'; // Deep Green
      
      // Leaf shape using bezier curves
      c.moveTo(0, -r);
      c.quadraticCurveTo(r * 0.5, -r * 0.5, r * 0.2, r);
      c.quadraticCurveTo(0, r * 0.8, -r * 0.2, r);
      c.quadraticCurveTo(-r * 0.5, -r * 0.5, 0, -r);
      c.fill();
      
      // Draw midrib/vein
      c.beginPath();
      c.strokeStyle = '#4CAF50';
      c.lineWidth = 1;
      c.moveTo(0, -r);
      c.lineTo(0, r);
      c.stroke();
      
      c.restore();
    };

    // Helper to draw a sparkle
    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.save();
      c.translate(x, y);
      c.beginPath();
      c.fillStyle = 'rgba(251, 192, 45, 0.7)';
      c.arc(0, 0, size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const createParticle = (initTop = false): Particle => {
      const types: ('flower' | 'leaf' | 'sparkle')[] = ['flower', 'leaf', 'sparkle'];
      const type = types[Math.floor(Math.random() * types.length)];
      const size = type === 'sparkle' ? Math.random() * 2 + 1 : Math.random() * 8 + 8;
      
      return {
        x: Math.random() * canvas.width,
        y: initTop ? Math.random() * canvas.height : -20,
        size,
        speedY: type === 'sparkle' ? Math.random() * 0.3 + 0.2 : Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.4 - 0.2,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
        type,
        color: type === 'leaf' ? '#2E7D32' : '#FBC02D',
        swaySpeed: Math.random() * 0.01 + 0.005,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.y += p.speedY;
        p.swayOffset += p.swaySpeed;
        p.x += Math.sin(p.swayOffset) * 0.4 + p.speedX;
        p.angle += p.spin;

        // Draw particle based on type with low opacity
        ctx.globalAlpha = p.type === 'sparkle' ? 0.4 : 0.25;

        if (p.type === 'flower') {
          drawMarigold(ctx, p.x, p.y, p.size, p.angle);
        } else if (p.type === 'leaf') {
          drawLeaf(ctx, p.x, p.y, p.size, p.angle);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size);
        }

        // Reset particles that go off-screen
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          particles[idx] = createParticle(false);
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
};

export default FloatingFlowers;
