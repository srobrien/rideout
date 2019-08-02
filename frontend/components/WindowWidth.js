import React, { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    if (window) {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    setWidth(1024);
  });

  return width;
}

export default useWindowWidth;
