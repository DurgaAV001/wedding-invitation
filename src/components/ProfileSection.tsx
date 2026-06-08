import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import ChildCareIcon from '@mui/icons-material/ChildCare';

// Import images
import groomImg from '../assets/image/groom.jpeg';
import brideImg from '../assets/image/bride.jpeg';

export const ProfileSection: React.FC = () => {
  // Decorative Hanging Garland (Mango Leaves & Marigolds) SVG
  const renderHangingGarland = () => (
    <svg width="100%" height="24" viewBox="0 0 240 24" fill="none" style={{ color: 'var(--color-gold)', opacity: 0.95, display: 'block', margin: '0 auto' }}>
      {/* Mango Leaves */}
      {[20, 60, 100, 140, 180, 220].map((cx) => (
        <path key={cx} d={`M ${cx - 15} 0 Q ${cx} 22, ${cx + 15} 0 Z`} fill="var(--color-green)" stroke="var(--color-dark-green)" strokeWidth="0.8" />
      ))}
      {/* Marigold blossoms in between */}
      {[40, 80, 120, 160, 200].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="4" r="5" fill="#FF9800" />
          <circle cx={cx} cy="4" r="3.5" fill="#FBC02D" />
          <circle cx={cx} cy="4" r="1.5" fill="#E65100" />
        </g>
      ))}
      {/* String line */}
      <line x1="0" y1="1" x2="240" y2="1" stroke="var(--color-gold)" strokeWidth="1.5" />
    </svg>
  );

  // Corner filigree shapes for wedding cards
  const renderCornerFiligree = () => (
    <>
      {/* Top-Left */}
      <svg width="25" height="25" viewBox="0 0 40 40" style={{ position: 'absolute', top: 6, left: 6, color: 'var(--color-gold-dark)', opacity: 0.6 }}>
        <path d="M 0 0 L 25 0 C 12 0, 0 12, 0 25 Z" fill="currentColor" />
        <path d="M 0 0 L 35 0 C 18 0, 0 18, 0 35" stroke="var(--color-gold)" strokeWidth="1" fill="none" />
      </svg>
      {/* Top-Right */}
      <svg width="25" height="25" viewBox="0 0 40 40" style={{ position: 'absolute', top: 6, right: 6, color: 'var(--color-gold-dark)', opacity: 0.6, transform: 'rotate(90deg)' }}>
        <path d="M 0 0 L 25 0 C 12 0, 0 12, 0 25 Z" fill="currentColor" />
        <path d="M 0 0 L 35 0 C 18 0, 0 18, 0 35" stroke="var(--color-gold)" strokeWidth="1" fill="none" />
      </svg>
      {/* Bottom-Left */}
      <svg width="25" height="25" viewBox="0 0 40 40" style={{ position: 'absolute', bottom: 6, left: 6, color: 'var(--color-gold-dark)', opacity: 0.6, transform: 'rotate(-90deg)' }}>
        <path d="M 0 0 L 25 0 C 12 0, 0 12, 0 25 Z" fill="currentColor" />
        <path d="M 0 0 L 35 0 C 18 0, 0 18, 0 35" stroke="var(--color-gold)" strokeWidth="1" fill="none" />
      </svg>
      {/* Bottom-Right */}
      <svg width="25" height="25" viewBox="0 0 40 40" style={{ position: 'absolute', bottom: 6, right: 6, color: 'var(--color-gold-dark)', opacity: 0.6, transform: 'rotate(180deg)' }}>
        <path d="M 0 0 L 25 0 C 12 0, 0 12, 0 25 Z" fill="currentColor" />
        <path d="M 0 0 L 35 0 C 18 0, 0 18, 0 35" stroke="var(--color-gold)" strokeWidth="1" fill="none" />
      </svg>
    </>
  );

  // Render family details as a premium vertical list of cards with gold circular medallions
  const renderFamilyDetails = (type: 'groom' | 'bride') => {
    const isGroom = type === 'groom';

    const members = isGroom
      ? [
        {
          relation: 'PARENTS',
          names: ['Mr. Thiyagarajan & Mrs. Kanchana'],
          icon: <PeopleIcon style={{ fontSize: '1.15rem', color: '#FFFFFF' }} />,
        },
        {
          relation: 'SISTER & BROTHER-IN-LAW',
          names: ['Mrs. Mohana Priya & Mr. Sailendra Prasath'],
          icon: <StarIcon style={{ fontSize: '1.15rem', color: '#FFFFFF' }} />,
        },
        {
          relation: 'NIECE',
          names: ['Ezhil Nila'],
          icon: <ChildCareIcon style={{ fontSize: '1.15rem', color: '#FFFFFF' }} />,
          isSpecial: true,
        }
      ]
      : [
        {
          relation: 'PARENTS',
          names: ['Mr. Vadivel A M & Mrs. Shanthi P M'],
          icon: <PeopleIcon style={{ fontSize: '1.15rem', color: '#FFFFFF' }} />,
        },
        {
          relation: 'ELDER SISTER & BROTHER-IN-LAW',
          names: ['Mrs. Vinothini A V & Mr. Gopinath'],
          icon: <StarIcon style={{ fontSize: '1.15rem', color: '#FFFFFF' }} />,
        },
        {
          relation: 'NEPHEWS',
          names: ['Lenin Maran & Ela Maran'],
          icon: <ChildCareIcon style={{ fontSize: '1.15rem', color: '#FFFFFF' }} />,
          isSpecial: true,
        }
      ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '290px',
          margin: '0 auto',
          padding: '6px 0'
        }}
      >
        {members.map((member, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '12px',
              padding: '10px 14px',
              border: '1.2px solid var(--color-gold)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Left Circular Medallion */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-gold) 0%, #B8860B 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '12px',
                flexShrink: 0,
                boxShadow: '0 2px 5px rgba(184, 134, 11, 0.35)',
                border: '1.5px solid #FFFFFF'
              }}
            >
              {member.icon}
            </div>

            {/* Right Details */}
            <div style={{ textAlign: 'left', flexGrow: 1 }}>
              <span
                className="font-heading"
                style={{
                  fontSize: '0.55rem',
                  color: 'var(--color-gold-dark)',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  display: 'block',
                  lineHeight: '1.2'
                }}
              >
                {member.relation}
              </span>
              <div
                className="font-main"
                style={{
                  fontSize: '0.74rem',
                  color: 'var(--color-dark-green)',
                  fontWeight: 650,
                  marginTop: '1px',
                  lineHeight: '1.3'
                }}
              >
                {member.names.map((name, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {name}
                    {member.isSpecial && i === member.names.length - 1 && (
                      <FavoriteIcon style={{ color: '#D32F2F', fontSize: '0.65rem' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Watermark leaf outline inside medallion card */}
            <div style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.04, transform: 'rotate(45deg)', pointerEvents: 'none' }}>
              <FavoriteIcon style={{ fontSize: '4.5rem', color: 'var(--color-green)' }} />
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '30px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '35px',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '5px' }}>
        <span
          className="font-heading"
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-gold-dark)',
            letterSpacing: '3px',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          Bride & Groom
        </span>
        <h2 className="font-heading" style={{ fontSize: '1.25rem', color: 'var(--color-green)', marginTop: '4px' }}>
          Our Profiles
        </h2>
        <div style={{ height: '2.5px', width: '45px', backgroundColor: 'var(--color-gold)', margin: '8px auto 0 auto', borderRadius: '2px' }} />
      </div>

      {/* --- GROOM SECTION --- */}
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="hover"
        viewport={{ once: true, margin: "-40px" }}
        style={{
          width: '88%',
          alignSelf: 'flex-start',
          borderRadius: 'var(--border-radius-card)',
          border: '1.8px solid var(--color-gold)',
          boxShadow: 'var(--shadow-premium)',
          marginLeft: '4%',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        {/* Background Image Layer with Zoom Effect */}
        <motion.div
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.06 }
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${groomImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 15%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Overlay Color Gradient (Matching background theme) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(27, 77, 34, 0.45) 0%, rgba(27, 77, 34, 0.94) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Content Wrapper to sit above the background photo overlay */}
        <div style={{ position: 'relative', zIndex: 3, padding: '16px 14px', width: '100%', height: '100%' }}>
          {renderCornerFiligree()}
          {renderHangingGarland()}

          <div style={{ marginTop: '15px' }}>
            <span className="font-heading" style={{ fontSize: '0.65rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '1.5px' }}>
              THE GROOM
            </span>
            <h3 className="font-heading" style={{ fontSize: '1.45rem', color: 'var(--color-white)', margin: '3px 0 6px 0', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              Naveen Raj T
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', color: '#E0E0E0', fontSize: '0.8rem', fontWeight: 500 }}>
              <WorkIcon style={{ fontSize: '0.95rem', color: 'var(--color-gold)' }} />
              <span className="font-main" style={{ fontWeight: 600 }}>Assistant Manager</span>
            </div>
          </div>

          {/* Hint text that fades out on hover */}
          <motion.div
            variants={{
              initial: { opacity: 0.65, height: 'auto', marginTop: 12 },
              hover: { opacity: 0, height: 0, marginTop: 0, overflow: 'hidden' }
            }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}
          >
          </motion.div>

          {/* Growing Family Details Container */}
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { height: 0, opacity: 0 },
                hover: { height: 'auto', opacity: 1 }
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: '1px dashed rgba(251, 192, 45, 0.35)', paddingTop: '15px', marginTop: '15px' }}>
                {renderFamilyDetails('groom')}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- BRIDE SECTION --- */}
      <motion.div
        initial="initial"
        whileHover="hover"
        whileTap="hover"
        viewport={{ once: true, margin: "-40px" }}
        style={{
          width: '88%',
          alignSelf: 'flex-end',
          borderRadius: 'var(--border-radius-card)',
          border: '1.8px solid var(--color-gold)',
          boxShadow: 'var(--shadow-premium)',
          marginRight: '4%',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        {/* Background Image Layer with Zoom Effect */}
        <motion.div
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.06 }
          }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${brideImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 15%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Overlay Color Gradient (Matching background theme) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(27, 77, 34, 0.45) 0%, rgba(27, 77, 34, 0.94) 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Content Wrapper to sit above the background photo overlay */}
        <div style={{ position: 'relative', zIndex: 3, padding: '16px 14px', width: '100%', height: '100%' }}>
          {renderCornerFiligree()}
          {renderHangingGarland()}

          <div style={{ marginTop: '15px' }}>
            <span className="font-heading" style={{ fontSize: '0.65rem', color: 'var(--color-gold)', fontWeight: 700, letterSpacing: '1.5px' }}>
              THE BRIDE
            </span>
            <h3 className="font-heading" style={{ fontSize: '1.45rem', color: 'var(--color-white)', margin: '3px 0 6px 0', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>
              Durga A V
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', color: '#E0E0E0', fontSize: '0.8rem', fontWeight: 500 }}>
              <WorkIcon style={{ fontSize: '0.95rem', color: 'var(--color-gold)' }} />
              <span className="font-main" style={{ fontWeight: 600 }}>Software Developer</span>
            </div>
          </div>

          {/* Hint text that fades out on hover */}
          <motion.div
            variants={{
              initial: { opacity: 0.65, height: 'auto', marginTop: 12 },
              hover: { opacity: 0, height: 0, marginTop: 0, overflow: 'hidden' }
            }}
            transition={{ duration: 0.3 }}
            style={{ fontSize: '0.62rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'italic' }}
          >
            Hover or Tap card to view family details
          </motion.div>

          {/* Growing Family Details Container */}
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { height: 0, opacity: 0 },
                hover: { height: 'auto', opacity: 1 }
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ borderTop: '1px dashed rgba(251, 192, 45, 0.35)', paddingTop: '15px', marginTop: '15px' }}>
                {renderFamilyDetails('bride')}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
