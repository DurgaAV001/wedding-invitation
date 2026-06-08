import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import confetti from 'canvas-confetti';
import audioFeedback from './AudioFeedback';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
}

interface ScratchRevealProps {
  onRevealComplete: () => void;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({ onRevealComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const isDrawing = useRef(false);
  const sparkles = useRef<Sparkle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const cardWidth = 280;
  const cardHeight = 140;

  // Initialize Canvas Overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set correct dimensions
    canvas.width = cardWidth;
    canvas.height = cardHeight;

    // Draw Golden Metallic Gradient cover
    const gradient = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
    gradient.addColorStop(0, '#D4AF37'); // Metallic Gold
    gradient.addColorStop(0.3, '#FFFDD0'); // Cream highlight
    gradient.addColorStop(0.5, '#FBC02D'); // Turmeric Gold
    gradient.addColorStop(0.8, '#AA7C11'); // Dark Bronze Gold
    gradient.addColorStop(1, '#D4AF37');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, cardWidth, cardHeight);

    // Draw subtle traditional borders on the scratch area
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, cardWidth - 20, cardHeight - 20);

    // Draw circular mandala pattern in center
    ctx.beginPath();
    ctx.arc(cardWidth / 2, cardHeight / 2, 40, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cardWidth / 2, cardHeight / 2, 30, 0, Math.PI * 2);
    ctx.stroke();

    // Cover Text Instructions
    ctx.fillStyle = 'var(--color-dark-green)';
    ctx.font = 'bold 15px "Cinzel", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH TO REVEAL', cardWidth / 2, cardHeight / 2 - 12);
    
    ctx.font = '10px "Poppins", sans-serif';
    ctx.fillStyle = '#7A5C00';
    ctx.fillText('THE WEDDING DATE', cardWidth / 2, cardHeight / 2 + 12);

    // Start particle physics loop
    const updateSparkles = () => {
      // Clear secondary canvas drawing if we had one, but here we paint particles in the loop
      // Update particles
      sparkles.current.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.size *= 0.96; // Shrink
        if (p.alpha <= 0 || p.size <= 0.5) {
          sparkles.current.splice(idx, 1);
        }
      });

      // Request next frame
      animationFrameId.current = requestAnimationFrame(updateSparkles);
    };
    updateSparkles();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const getCoordinates = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX = 0;
    let clientY = 0;

    // Check touch points in synthetic or native events
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else if (e.nativeEvent && e.nativeEvent.touches && e.nativeEvent.touches.length > 0) {
      clientX = e.nativeEvent.touches[0].clientX;
      clientY = e.nativeEvent.touches[0].clientY;
    } else if (e.nativeEvent && e.nativeEvent.changedTouches && e.nativeEvent.changedTouches.length > 0) {
      clientX = e.nativeEvent.changedTouches[0].clientX;
      clientY = e.nativeEvent.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const spawnSparkles = (x: number, y: number) => {
    // Spawn 3-5 golden particles per scratch movement
    const count = 4;
    for (let i = 0; i < count; i++) {
      sparkles.current.push({
        x,
        y,
        vx: (Math.random() * 2 - 1) * 1.5,
        vy: (Math.random() * 2 - 1) * 1.5 - 0.5, // Slight upward drift
        size: Math.random() * 3 + 2,
        alpha: 1.0,
        decay: Math.random() * 0.03 + 0.02,
      });
    }
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scratch out the cover
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2); // 18px brush size
    ctx.fill();

    // Spawn gold sparkles
    spawnSparkles(x, y);
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    // Prevent scrolling when scratching on mobile
    if (e.cancelable) {
      e.preventDefault();
    }
    isDrawing.current = true;
    const coords = getCoordinates(e);
    scratch(coords.x, coords.y);
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || isRevealed) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const coords = getCoordinates(e);
    scratch(coords.x, coords.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, cardWidth, cardHeight);
    const data = imgData.data;

    let cleared = 0;
    const step = 15; // Grid sampling step size for performance
    let total = 0;

    for (let y = 0; y < cardHeight; y += step) {
      for (let x = 0; x < cardWidth; x += step) {
        const alphaIndex = (y * cardWidth + x) * 4 + 3;
        if (data[alphaIndex] === 0) {
          cleared++;
        }
        total++;
      }
    }

    const percentage = Math.round((cleared / total) * 100);
    setPercentScratched(percentage);

    // If 70% or more is cleared, trigger reveal
    if (percentage >= 70) {
      revealDate();
    }
  };

  const revealDate = () => {
    setIsRevealed(true);
    setPercentScratched(100);

    // Audio chimes
    audioFeedback.playSuccess();

    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#FBC02D', '#4CAF50', '#2E7D32', '#FFFFFF'],
    });
  };

  // Draw sparkles overlay in separate render so canvas destination-out doesn't delete particles
  const ParticleOverlay: React.FC = () => {
    const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      const canvas = overlayCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = cardWidth;
      canvas.height = cardHeight;

      let frameId: number;

      const draw = () => {
        ctx.clearRect(0, 0, cardWidth, cardHeight);
        sparkles.current.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = '#FFFDD0'; // Gold/White core
          ctx.shadowColor = '#FFD700'; // Gold glow
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        frameId = requestAnimationFrame(draw);
      };
      draw();

      return () => cancelAnimationFrame(frameId);
    }, []);

    return (
      <canvas
        ref={overlayCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
    );
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '20px 0 60px 0',
        width: '100%',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Scratch Header Description */}
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3
          className="font-heading"
          style={{
            fontSize: '1.05rem',
            color: 'var(--color-gold-dark)',
            letterSpacing: '1.5px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Revealing the Marriage Date
        </h3>
        <p className="font-main" style={{ fontSize: '0.75rem', color: '#666666', marginTop: '4px', fontWeight: 500 }}>
          ✨ Touch and scratch the card below ✨
        </p>
      </div>

      {/* The Scratch Card Body */}
      <div
        style={{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-premium)',
          border: '1.5px solid var(--color-gold)',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Underneath: The Actual Wedding Date (Visible when scratch layer is cleared) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--color-gold-light)',
            backgroundImage: 'radial-gradient(circle at center, var(--color-white) 0%, transparent 80%)',
          }}
        >
          {/* Subtle Date shine / pulse glow */}
          <motion.div
            animate={isRevealed ? { scale: [1, 1.03, 1], textShadow: ['0 0 10px rgba(251,192,45,0.4)', '0 0 20px rgba(251,192,45,0.8)', '0 0 10px rgba(251,192,45,0.4)'] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span
              className="font-heading"
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-green)',
                fontWeight: 700,
                letterSpacing: '3px',
              }}
            >
              WEDDING MUHURTHAM
            </span>

            <h3
              className="font-heading"
              style={{
                fontSize: '1.8rem',
                color: 'var(--color-dark-green)',
                fontWeight: 800,
                marginTop: '6px',
                lineHeight: 1.1,
              }}
            >
              23rd August 2026
            </h3>

            <p
              className="font-main"
              style={{
                fontSize: '1.05rem',
                color: 'var(--color-gold-dark)',
                fontWeight: 600,
                marginTop: '4px',
              }}
            >
              Sunday | 6:00 AM
            </p>

            <span
              style={{
                fontSize: '0.7rem',
                color: '#666666',
                fontStyle: 'italic',
                marginTop: '8px',
              }}
            >
              Fort Gate, Trivandrum
            </span>
          </motion.div>
        </div>

        {/* Dynamic Sparkle Particle Canvas overlay */}
        {!isRevealed && <ParticleOverlay />}

        {/* Scratchable Canvas Surface Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'crosshair',
                zIndex: 3,
                touchAction: 'none', // Block system scrolling when scratching on canvas
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Progress display / Completion Proceed Button */}
      <div style={{ marginTop: '20px', minHeight: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {!isRevealed ? (
          <span
            className="font-main"
            style={{
              fontSize: '0.75rem',
              color: '#888888',
              fontWeight: 500,
            }}
          >
            Scratched: {percentScratched}% {percentScratched >= 50 && '...almost there!'}
          </span>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <Button
              onClick={onRevealComplete}
              className="btn-gold pulse-glow"
              endIcon={<KeyboardDoubleArrowRightIcon />}
              style={{
                fontSize: '0.85rem',
                padding: '10px 28px',
                borderRadius: '30px',
              }}
            >
              Open Invitation Details
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ScratchReveal;
