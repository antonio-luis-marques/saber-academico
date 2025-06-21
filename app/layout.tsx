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
        className={`flex flex-col min-h-screen relative bg-gradient-to-br from-[#418bf61a] to-white`}
      >
        <div className="absolute inset-0 z-0  bg-[linear-gradient(to_right,#418bf61a_1px,transparent_1px),linear-gradient(to_bottom,#418bf61a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <Header />
        {/* <div className="z-10 bg-black relative"> */}
          <div className="w-full flex grow flex-1">
            {children}
          </div>

          <div className="flex">
            <Footer />
          </div>
          <BackToTopButton />
        {/* </div> */}

      </body>
    </html>
  );
}
