import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return visible ? (
    <div
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
        width: '100%',
        background: '#198754',
        color: 'white',
        textAlign: 'center',
        padding: '14px 0',
        fontSize: 20,
        fontWeight: 600,
        letterSpacing: 1,
        cursor: 'pointer',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.10)',
        transition: 'background 0.2s',
      }}
      aria-label="Back to top"
    >
      <span style={{ marginRight: 10, fontSize: 24, verticalAlign: 'middle' }}>↑</span>
      Back to Top
    </div>
  ) : null;
};

export default BackToTop; 