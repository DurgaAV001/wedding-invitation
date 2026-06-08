import React, { useEffect } from 'react';
import Countdown from 'react-countdown';
import { motion, useAnimation } from 'framer-motion';

// Target Wedding Date: 23 August 2026 at 06:00:00 AM IST
const WEDDING_DATE = new Date('2026-08-23T06:00:00').getTime();

interface TimeBlockProps {
  value: number;
  label: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ value, label }) => {
  const controls = useAnimation();

  // Pulse effect whenever the time value ticks down
  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      boxShadow: [
        '0 4px 12px rgba(0,0,0,0.1)',
        '0 0 16px rgba(251, 192, 45, 0.7)',
        '0 4px 12px rgba(0,0,0,0.1)',
      ],
      transition: { duration: 0.3, ease: 'easeInOut' }
    });
  }, [value, controls]);

  const formatNumber = (num: number) => String(num).padStart(2, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.div
        animate={controls}
        style={{
          width: '64px',
          height: '64px',
          backgroundColor: 'var(--color-green)',
          border: '2px solid var(--color-gold)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--color-white)',
          fontSize: '1.5rem',
          fontWeight: 700,
          fontFamily: 'var(--font-main)',
          boxShadow: 'var(--shadow-premium)',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        {formatNumber(value)}
      </motion.div>
      <span
        className="font-heading"
        style={{
          fontSize: '0.65rem',
          color: 'var(--color-dark-green)',
          fontWeight: 'bold',
          marginTop: '6px',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const CountdownSection: React.FC = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-green)',
            color: 'var(--color-gold)',
            borderRadius: '10px',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            textAlign: 'center',
            border: '2px solid var(--color-gold)',
            boxShadow: 'var(--shadow-gold)',
          }}
        >
          ✨ THE AUSPICIOUS MUHURTHAM IS UNDERWAY! ✨
        </motion.div>
      );
    }

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
        }}
      >
        <TimeBlock value={days} label="Days" />
        <TimeBlock value={hours} label="Hours" />
        <TimeBlock value={minutes} label="Mins" />
        <TimeBlock value={seconds} label="Secs" />
      </div>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px 0',
      }}
    >
      <span
        className="font-heading"
        style={{
          fontSize: '0.75rem',
          color: 'var(--color-gold-dark)',
          fontWeight: 700,
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          marginBottom: '15px',
        }}
      >
        Wedding Countdown
      </span>
      <Countdown date={WEDDING_DATE} renderer={renderer} />
    </div>
  );
};

export default CountdownSection;
