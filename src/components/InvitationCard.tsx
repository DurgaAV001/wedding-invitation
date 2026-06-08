import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const InvitationCard: React.FC = () => {
  // Corner flourish ornament drawer
  const renderCornerFlourish = (style: React.CSSProperties, rotate: number) => (
    <div style={{ position: 'absolute', width: '32px', height: '32px', color: 'var(--color-gold)', opacity: 0.8, ...style, transform: `rotate(${rotate}deg)` }}>
      <svg viewBox="0 0 30 30" width="100%" height="100%" fill="currentColor">
        <path d="M 0 0 L 25 0 C 15 5, 5 15, 0 25 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M 0 0 L 15 0 C 10 3, 3 10, 0 15 Z" fill="currentColor" />
        <circle cx="22" cy="8" r="1.5" />
        <circle cx="8" cy="22" r="1.5" />
      </svg>
    </div>
  );

  return (
    <div
      style={{
        width: '100%',
        padding: '20px 15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      {/* Ornate Gold Invitation Envelope/Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--border-radius-card)',
          padding: '30px 20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          position: 'relative',
          border: '1px solid rgba(251, 192, 45, 0.4)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {/* Border Drawing Animation */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <motion.rect
            x="8"
            y="8"
            rx="16"
            style={{ width: 'calc(100% - 16px)', height: 'calc(100% - 16px)' }}
            stroke="var(--color-gold)"
            strokeWidth="2.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
          <motion.rect
            x="14"
            y="14"
            rx="12"
            style={{ width: 'calc(100% - 28px)', height: 'calc(100% - 28px)' }}
            stroke="var(--color-gold)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>

        {/* Ornate Corner Flourishes */}
        {renderCornerFlourish({ top: '16px', left: '16px' }, 0)}
        {renderCornerFlourish({ top: '16px', right: '16px' }, 90)}
        {renderCornerFlourish({ bottom: '16px', left: '16px' }, -90)}
        {renderCornerFlourish({ bottom: '16px', right: '16px' }, 180)}

        {/* Ganesh/Lotus Header Symbol */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ width: '50px', height: '50px', color: 'var(--color-gold)', marginBottom: '15px' }}
        >
          {/* Detailed Golden Lotus SVG */}
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M12 2C11.5 5 9 6.5 9 9C9 10.5 10 11.5 12 13C14 11.5 15 10.5 15 9C15 6.5 12.5 5 12 2Z" />
            <path d="M12 5C13.5 7.5 18 9 18 11.5C18 13.5 15.5 15 12 17.5C8.5 15 6 13.5 6 11.5C6 9 10.5 7.5 12 5Z" opacity="0.8" />
            <path d="M12 9C15 11.5 21 13 21 15.5C21 17 18 18 12 21C6 18 3 17 3 15.5C3 13 9 11.5 12 9Z" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Wedding Title Text */}
        <span
          className="font-heading"
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-green)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          Wedding Invitation
        </span>

        {/* Bride & Groom Names */}
        <div style={{ margin: '15px 0 5px 0' }}>
          <h2
            className="font-heading"
            style={{
              fontSize: '1.8rem',
              color: 'var(--color-gold-dark)',
              lineHeight: 1.2,
              fontWeight: 700,
            }}
          >
            Naveen Raj T
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ color: '#D32F2F', fontSize: '1.2rem', margin: '5px 0' }}
          >
            ❤️
          </motion.div>
          <h2
            className="font-heading"
            style={{
              fontSize: '1.8rem',
              color: 'var(--color-gold-dark)',
              lineHeight: 1.2,
              fontWeight: 700,
            }}
          >
            Durga A V

          </h2>
        </div>

        {/* Invitation Message */}
        <p
          className="font-main"
          style={{
            fontSize: '0.8rem',
            color: '#666666',
            lineHeight: 1.5,
            maxWidth: '280px',
            margin: '15px 0 25px 0',
          }}
        >
          Together with their parents, we request the honor of your presence to celebrate the auspicious wedding ceremony of our children.
        </p>

        {/* Info Grid (Date, Time, Venue) */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            borderTop: '1px solid #F0F0F0',
            borderBottom: '1px solid #F0F0F0',
            padding: '20px 0',
            marginBottom: '20px',
          }}
        >
          {/* Date Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <CalendarMonthIcon style={{ color: 'var(--color-green)' }} />
            <div>
              <span className="font-heading" style={{ fontSize: '0.7rem', color: '#888888', display: 'block', fontWeight: 'bold' }}>DATE</span>
              <span className="font-main" style={{ fontSize: '0.85rem', color: 'var(--color-dark-green)', fontWeight: 600 }}>
                Sunday, 23 August 2026
              </span>
            </div>
          </div>

          {/* Time Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <AccessTimeIcon style={{ color: 'var(--color-green)' }} />
            <div>
              <span className="font-heading" style={{ fontSize: '0.7rem', color: '#888888', display: 'block', fontWeight: 'bold' }}>TIME</span>
              <span className="font-main" style={{ fontSize: '0.85rem', color: 'var(--color-dark-green)', fontWeight: 600 }}>
                Auspicious Muhurtham: 6:00 AM
              </span>
            </div>
          </div>

          {/* Venue Block */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
            <LocationOnIcon style={{ color: 'var(--color-green)' }} />
            <div>
              <span className="font-heading" style={{ fontSize: '0.7rem', color: '#888888', display: 'block', fontWeight: 'bold' }}>VENUE</span>
              <span className="font-main" style={{ fontSize: '0.85rem', color: 'var(--color-dark-green)', fontWeight: 600 }}>
                Sree Padmanabhaswamy Kalyana Mandapam, East Gate, Trivandrum
              </span>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <p
          className="font-main"
          style={{
            fontSize: '0.85rem',
            color: 'var(--color-green)',
            fontWeight: 500,
            margin: '15px 0 10px 0',
            fontStyle: 'italic',
            lineHeight: 1.4,
            maxWidth: '280px',
          }}
        >
          "We request the honor of your presence to bless our special day."
        </p>

        {/* Traditional Quote Block */}
        <div
          style={{
            margin: '15px 0 25px 0',
            padding: '12px 16px',
            borderLeft: '3px solid var(--color-gold)',
            backgroundColor: 'rgba(251, 192, 45, 0.04)',
            fontStyle: 'italic',
            fontSize: '0.78rem',
            color: 'var(--color-dark-green)',
            lineHeight: 1.5,
            borderRadius: '0 8px 8px 0',
            textAlign: 'left',
            maxWidth: '280px',
            fontFamily: 'var(--font-main)',
          }}
        >
          “Two lives, two hearts, joined together in friendship, united forever in love. We seek your presence and blessings as we embark on this beautiful journey of togetherness.”
        </div>

        {/* RSVP RSVP Action Button */}
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon />}
          href="https://wa.me/919876543210?text=Hi%20Durga%20and%20Naveen,%20I%20would%20love%20to%20attend%20your%20wedding!%20Confirming%20my%20RSVP."
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            borderRadius: '25px',
            padding: '8px 24px',
            boxShadow: '0 4px 10px rgba(37, 211, 102, 0.4)',
            textTransform: 'none',
          }}
        >
          Confirm RSVP via WhatsApp
        </Button>
      </motion.div>
    </div>
  );
};

export default InvitationCard;
