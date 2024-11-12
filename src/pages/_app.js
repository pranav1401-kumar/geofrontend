import '../styles/globals.css';
import { useAuth } from '../utils/auth';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const { token } = useAuth();

  useEffect(() => {
    // Fix Leaflet icon issues
    if (typeof window !== 'undefined') {
      // Load Leaflet-related code only on client side
      const L = require('leaflet');
      
      // Delete default icon configurations
      delete L.Icon.Default.prototype._getIconUrl;
      
      // Set up default icon configurations
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/images/marker-icon-2x.png',
        iconUrl: '/images/marker-icon.png',
        shadowUrl: '/images/marker-shadow.png',
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;