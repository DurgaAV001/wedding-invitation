import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import WelcomeScreen from './components/WelcomeScreen';
import ProfileSection from './components/ProfileSection';
import ScratchReveal from './components/ScratchReveal';
import CountdownSection from './components/CountdownSection';
import InvitationCard from './components/InvitationCard';
import VenueCard from './components/VenueCard';
import FloatingFlowers from './components/FloatingFlowers';
import audioFeedback from './components/AudioFeedback';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCurtains, setShowCurtains] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const countdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      scrollContainer: '.mobile-container', // Track scrolls within the framed container
    } as any);
  }, []);

  const handleOpenInvitation = () => {
    audioFeedback.playChime();
    setShowCurtains(true);

    // After curtains slide closed, transition the state
    setTimeout(() => {
      setIsOpen(true);
    }, 800);

    // Slide curtains open and scroll to details
    setTimeout(() => {
      setShowCurtains(false);
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      // Refresh AOS layout once smooth scroll completes
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }, 1800);
  };

  const handleScratchComplete = () => {
    setIsScratched(true);
    // Smooth scroll down to countdown section after reveal
    setTimeout(() => {
      if (countdownRef.current) {
        countdownRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      // Refresh AOS layout for countdown and venue cards
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }, 1200);
  };

  return (
    <div 
      className="mobile-container" 
      style={{ 
        position: 'relative',
        overflowY: isOpen ? 'auto' : 'hidden' // Disable scrolling until opened
      }}
    >
      {/* Background decoration */}
      <FloatingFlowers />

      {/* Page 1: Welcome Screen (renders initially full-height) */}
      {!isOpen && (
        <div style={{ width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column' }}>
          <WelcomeScreen onOpen={handleOpenInvitation} />
        </div>
      )}

      {/* Pages 2 & 3: Scrollable Content (rendered when opened) */}
      {isOpen && (
        <div 
          ref={detailsRef}
          style={{ 
            width: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            paddingBottom: '50px',
            alignItems: 'center'
          }}
        >
          {/* Scrollable Profiles (Groom and Bride) */}
          <ProfileSection />

          {/* Medium Scratch Card for Date Reveal */}
          <ScratchReveal onRevealComplete={handleScratchComplete} />

          {/* Unlocked Page 3 Sections */}
          <AnimatePresence>
            {isScratched && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                ref={countdownRef}
              >
                {/* Countdown Section */}
                <div style={{ width: '100%', padding: '0 15px 20px 15px', zIndex: 10 }}>
                  <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 'var(--border-radius-card)', padding: '10px 0', border: '1.5px solid rgba(251, 192, 45, 0.2)', boxShadow: 'var(--shadow-premium)' }}>
                    <CountdownSection />
                  </div>
                </div>

                {/* Final Invitation Card (Self-drawing borders, names, thoughtful quotes) */}
                <InvitationCard />

                {/* Venue Details Card */}
                <VenueCard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Curtain Transition overlay panels */}
      <AnimatePresence>
        {showCurtains && (
          <>
            {/* Left Curtain */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                backgroundColor: 'var(--color-green)',
                borderRight: '2px solid var(--color-gold)',
                boxShadow: '10px 0 30px rgba(0,0,0,0.5)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '15px', height: '100%', borderLeft: '3px double var(--color-gold)', marginRight: '5px', opacity: 0.7 }} />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50%',
                height: '100%',
                backgroundColor: 'var(--color-green)',
                borderLeft: '2px solid var(--color-gold)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                zIndex: 9999,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <div style={{ width: '15px', height: '100%', borderRight: '3px double var(--color-gold)', marginLeft: '5px', opacity: 0.7 }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
