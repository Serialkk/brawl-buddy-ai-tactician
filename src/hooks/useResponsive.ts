
import { useEffect, useState } from 'react';

type Breakpoints = {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
};

export const useResponsive = (): Breakpoints => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth;
      setBreakpoints({
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        '2xl': width >= 1536,
      });
    };

    // Initial check
    updateBreakpoints();
    
    // Add event listener
    window.addEventListener('resize', updateBreakpoints);
    
    // Clean up
    return () => window.removeEventListener('resize', updateBreakpoints);
  }, []);

  return breakpoints;
};
