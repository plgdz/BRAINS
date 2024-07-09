// layout.tsx
// Layout de base de l'application
// Auteurs : Paul Agudze, Thomas Garneau

import {Providers} from "./providers";

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
      <html lang="en" className='light'>
      <body>
      <Providers>
        {children}
      </Providers>
      </body>
      </html>
  );
}