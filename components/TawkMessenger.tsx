
import { useEffect } from 'react';

const TawkMessenger = () => {
  useEffect(() => {
    // Check if script is already present
    const existingScript = document.getElementById('tawk-script');
    if (existingScript) return;

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

    return () => {
      // Optional: Cleanup if the component unmounts
      // Tawk.to usually stays for the whole session, but cleaning up avoids duplicates in hot-reloading
      const scriptToRemove = document.getElementById('tawk-script');
      if (scriptToRemove) scriptToRemove.remove();
      // Remove the widget from DOM manually if Tawk doesn't handle it
      const widget = document.querySelector('.tawk-main-container');
      if (widget) widget.remove();
    };
  }, []);

  return null; // This component doesn't render anything itself
};

export default TawkMessenger;
