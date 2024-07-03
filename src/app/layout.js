
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';

function MatomoScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var _paq = window._paq = window._paq || [];
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="//analytics.uwcindia.org/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
          function trackEvent(category, action, name, value) {
            if (window._paq) {
              window._paq.push(['trackEvent', category, action, name, value]);
            }
          }
          window.trackEvent = trackEvent;
        `,
      }}
    />
  );
}

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== 'undefined' && window._paq) {
        window._paq.push(['setCustomUrl', pathname]);
        window._paq.push(['trackPageView']);
      }
    };

    handleRouteChange();
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <MatomoScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
