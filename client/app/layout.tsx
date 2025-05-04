import './globals.css';
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';
import ClientLayout from '../components/layout/ClientLayout';

  const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const metadata: Metadata = {
  title: 'HeyFood | Food Delivery',
  description: 'Order food from your favorite restaurants',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
