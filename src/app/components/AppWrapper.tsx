import React, { useEffect } from 'react';
import '../index.css'; // Import Tailwind CSS

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Add a class to body when in app mode
    document.body.classList.add('app-mode');
    
    return () => {
      // Remove the class when leaving app mode
      document.body.classList.remove('app-mode');
    };
  }, []);

  return <>{children}</>;
};