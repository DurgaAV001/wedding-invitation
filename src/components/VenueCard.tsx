import React from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';

export const VenueCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8 }}
      style={{
        width: '100%',
        padding: '0 15px 25px 15px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--border-radius-card)',
          padding: '24px 20px',
          border: '1.5px solid var(--color-gold)',
          boxShadow: 'var(--shadow-premium)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient embellishment */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'var(--color-green)' }} />
        
        <span
          className="font-heading"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-green)',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '8px',
          }}
        >
          Wedding Venue
        </span>

        <h3
          className="font-heading"
          style={{
            fontSize: '1.15rem',
            color: 'var(--color-dark-green)',
            fontWeight: 800,
            lineHeight: 1.2,
            margin: '5px 0',
          }}
        >
          Sree Padmanabhaswamy Kalyana Mandapam
        </h3>

        <p
          className="font-main"
          style={{
            fontSize: '0.8rem',
            color: '#555555',
            lineHeight: 1.45,
            margin: '10px auto 15px auto',
            maxWidth: '260px',
          }}
        >
          Fort East Gate, Near Sree Padmanabhaswamy Temple, Trivandrum, Kerala - 695023
        </p>

        {/* Mock Map Element */}
        <div
          style={{
            borderRadius: '8px',
            height: '110px',
            backgroundColor: '#E8F5E9',
            border: '1px solid #A5D6A7',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '15px',
          }}
        >
          {/* Map grid lines */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.25,
              backgroundImage:
                'linear-gradient(90deg, #A5D6A7 1px, transparent 1px), linear-gradient(#A5D6A7 1px, transparent 1px)',
              backgroundSize: '15px 15px',
            }}
          />
          {/* Map pin */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <LocationOnIcon style={{ color: '#D32F2F', fontSize: '2.4rem' }} />
            <span
              className="font-heading"
              style={{
                fontSize: '0.6rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '2px 8px',
                borderRadius: '10px',
                color: 'var(--color-dark-green)',
                fontWeight: 'bold',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                marginTop: '2px',
              }}
            >
              Fort Gate, Trivandrum
            </span>
          </div>
        </div>

        {/* Directions Navigation Button */}
        <Button
          variant="contained"
          startIcon={<DirectionsIcon />}
          href="https://maps.google.com/?q=Sree+Padmanabhaswamy+Temple+Trivandrum"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            backgroundColor: 'var(--color-green)',
            color: 'var(--color-white)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 'bold',
            fontSize: '0.8rem',
            width: '100%',
            borderRadius: '25px',
            padding: '8px 16px',
            boxShadow: 'var(--shadow-gold)',
            textTransform: 'uppercase',
          }}
        >
          Get Directions
        </Button>
      </div>
    </motion.div>
  );
};

export default VenueCard;
