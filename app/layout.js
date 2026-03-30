import './globals.css';

export const metadata = {
  title: 'dot. Systemic Impact Brief Builder',
  description: 'Convierte un reto complejo en una dirección clara y accionable.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
