
import { useEffect } from 'react';

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

const TawkMessenger = () => {
  useEffect(() => {
    // 1. Initialize global variables Tawk.to expects
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 2. Check if script is already present to prevent duplicates
    const existingScript = document.getElementById('tawk-script');
    if (existingScript) return;

    // 3. Create and inject the script
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    
    s1.id = 'tawk-script';
    s1.async = true;
    s1.src = 'https://embed.tawk.to/69161393fd8dcd195946f907/1j9v3oujf';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0);
    } else {
      document.head.appendChild(s1);
    }

    // Note: We don't remove the script on unmount in an SPA context 
    // to ensure the chat window persists across "page" navigations 
    // without re-loading the entire third-party library.
  }, []);

  return null;
};

export default TawkMessenger;
