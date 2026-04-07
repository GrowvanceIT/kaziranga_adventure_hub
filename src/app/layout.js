import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Kaziranga Adventure Hub | Premium Safari & Wildlife Tours in Assam",
    template: "%s | Kaziranga Adventure Hub"
  },
  description: "Experience the wild beauty of Kaziranga National Park with Kaziranga Adventure Hub. Book premium jeep safaris, elephant rides, and wildlife tours in Assam, India. Home to the Great One-Horned Rhinoceros.",
  keywords: ["Kaziranga Safari", "Kaziranga National Park", "Assam Wildlife Tour", "Jeep Safari Kaziranga", "Elephant Safari", "One-Horned Rhino", "Kaziranga Adventure Hub", "Wildlife Tourism Assam", "Kaziranga Safari Booking", "Best Safari Kaziranga"],
  authors: [{ name: "Kaziranga Adventure Hub" }],
  creator: "Kaziranga Adventure Hub",
  publisher: "Kaziranga Adventure Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kazirangaadventurehub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kazirangaadventurehub.com',
    title: 'Kaziranga Adventure Hub | Premium Safari & Wildlife Tours',
    description: 'Book premium safaris and wildlife experiences at Kaziranga National Park. Jeep safaris, elephant rides, and luxury stays in the heart of Assam.',
    siteName: 'Kaziranga Adventure Hub',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kaziranga Adventure Hub - Premium Wildlife Safari Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kaziranga Adventure Hub | Premium Safari & Wildlife Tours',
    description: 'Experience the wild beauty of Kaziranga National Park. Book premium safaris, elephant rides, and wildlife tours in Assam.',
    images: ['/images/twitter-image.jpg'],
    creator: '@KazirangaWild',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    'name': 'Kaziranga Adventure Hub',
    'description': 'Premium safari and wildlife tours in Kaziranga National Park, Assam, India',
    'url': 'https://kazirangaadventurehub.com',
    'logo': 'https://kazirangaadventurehub.com/images/logo.png',
    'image': 'https://kazirangaadventurehub.com/images/og-image.jpg',
    'telephone': '+91-98765-43210',
    'email': 'explore@kazirangaadventurehub.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Kohora',
      'addressRegion': 'Assam',
      'addressCountry': 'IN'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '26.5775',
      'longitude': '93.1711'
    },
    'priceRange': '₹₹',
    'openingHours': 'Mo-Su 05:30-16:00',
    'sameAs': [
      'https://www.facebook.com/kazirangaadventurehub',
      'https://www.instagram.com/kazirangawild',
      'https://twitter.com/kazirangawild'
    ],
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '50000'
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
