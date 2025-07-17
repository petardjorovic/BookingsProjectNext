import type { Metadata } from "next";

import { Josefin_Sans } from "next/font/google"; //** umesto google stavi local ako hoces svoj font iz kompa */
import "@/app/_styles/globals.css";
import Header from "./_components/Header";

const josefin = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // title: "The wild oasis", //* moze i ovako
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

//! ako fetchujes podatke direktno u RootLayout-u onda koristi global-error.tsx da bi uhvatio greske prilikom rendera RootLayout-a

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col relative antialiased`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
