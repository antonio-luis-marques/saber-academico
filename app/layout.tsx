import type { Metadata } from "next";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import BackToTopButton from "@/components/BackToTopButton/BackToTopButton";


export const metadata: Metadata = {
  title: {
    default: "DOCBIT",
    template: '%s - DOCBIT'
  },
  description: "Encontre livros e materiais completos para sua preparação em exames de admissão. Conteúdos organizados para ajudá-lo a conquistar sua vaga.",
  twitter: {
    card: 'summary_large_image'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`flex flex-col min-h-screen relative`}
      >
        <Header />
        <div className="w-full flex grow flex-1">
          {children}
        </div>

        <div className="flex">
          <Footer />
        </div>
        <BackToTopButton />
      </body>
    </html>
  );
}
