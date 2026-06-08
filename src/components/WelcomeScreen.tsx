import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface WelcomeScreenProps {
  onOpen: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onOpen }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px 20px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Decorative Floral Top Border (Vase / Hanging Garland Style) */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Ornate Garland SVG */}
        <svg width="280" height="60" viewBox="0 0 280 60" fill="none" style={{ color: 'var(--color-gold)' }}>
          <path d="M10 10 C 60 40, 220 40, 270 10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="5 5" />
          <path d="M30 18 C 70 45, 210 45, 250 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          {/* Hanging flowers */}
          {[40, 80, 120, 140, 160, 200, 240].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1={cx === 140 ? 35 : 25} x2={cx} y2={cx === 140 ? 55 : 45} stroke="currentColor" strokeWidth="2" />
              <circle cx={cx} cy={cx === 140 ? 55 : 45} r="6" fill="var(--color-gold)" />
              <circle cx={cx} cy={cx === 140 ? 55 : 45} r="2" fill="var(--color-green)" />
            </g>
          ))}
          <path d="M140 10 L 140 35" stroke="currentColor" strokeWidth="2" />
        </svg>
        <LocalFloristIcon
          style={{
            color: 'var(--color-gold)',
            position: 'absolute',
            top: -5,
            fontSize: '1.8rem'
          }}
        />
      </motion.div>

      {/* Rotating Mandala & Names Container */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
          position: 'relative'
        }}
      >
        {/* Rotating Mandala SVG */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            opacity: 0.12,
            color: 'var(--color-gold)',
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 100 100" width="100%" height="100%" fill="currentColor">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {[...Array(24)].map((_, i) => {
              const angle = (i * 360) / 24;
              return (
                <g key={i} transform={`rotate(${angle} 50 50)`}>
                  <path d="M 50 12 C 48 20, 52 20, 50 35 C 48 20, 52 20, 50 12" />
                  <circle cx="50" cy="8" r="1" />
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Invitation Text Overlay */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
          style={{
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            width: '100%'
          }}
        >
          {/* Welcome Text */}
          <span
            className="font-heading"
            style={{
              fontSize: '0.85rem',
              color: 'var(--color-gold)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            Auspicious Invitation
          </span>

          <span
            className="font-wedding"
            style={{
              fontSize: '2rem',
              color: 'var(--color-gold)',
              marginBottom: '20px'
            }}
          >
            Welcome to the Wedding of
          </span>

          {/* Bride's Name */}
          <motion.h1
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1, type: 'spring', stiffness: 50 }}
            className="font-wedding"
            style={{
              fontSize: '3.6rem',
              color: 'var(--color-gold)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              lineHeight: 1.1,
            }}
          >
            Durga
          </motion.h1>

          {/* weds icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, type: 'spring' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px 0',
              position: 'relative',
              width: '80px',
            }}
          >
            <div style={{ height: '1px', backgroundColor: 'var(--color-gold)', width: '100%', opacity: 0.5 }} />
            <FavoriteIcon
              style={{
                color: '#D32F2F',
                fontSize: '1.4rem',
                position: 'absolute',
                backgroundColor: 'var(--color-bg-yellow)',
                padding: '0 8px'
              }}
            />
          </motion.div>

          {/* Groom's Name */}
          <motion.h1
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1, type: 'spring', stiffness: 50 }}
            className="font-wedding"
            style={{
              fontSize: '3.6rem',
              color: 'var(--color-gold)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              lineHeight: 1.1,
              marginBottom: '10px',
            }}
          >
            Naveen Raj
          </motion.h1>

        </motion.div>
      </div>

      {/* Button and footer */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <Button
          onClick={onOpen}
          className="btn-gold pulse-glow"
          style={{
            fontSize: '0.95rem',
            padding: '12px 36px',
            borderRadius: '50px',
            fontFamily: 'var(--font-heading)',
          }}
        >
          Open Invitation
        </Button>

        {/* Small Traditional Floral Flourish bottom */}
        <div style={{ color: 'var(--color-gold)', display: 'flex', gap: '4px', opacity: 0.7 }}>
          <LocalFloristIcon fontSize="small" />
          <LocalFloristIcon fontSize="small" />
          <LocalFloristIcon fontSize="small" />
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
