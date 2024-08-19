import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Link to the manifest.json file for PWA functionality */}
        <link rel="manifest" href="/manifest.json" />

        {/* Define the theme color for the browser and devices */}
        <meta name="theme-color" content="#25564B" />

        {/* Enable the app to run as a standalone app on mobile */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Set the status bar appearance for iOS */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Specify the icon for when the app is added to the home screen */}
        <link rel="apple-touch-icon" href="/icon192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
