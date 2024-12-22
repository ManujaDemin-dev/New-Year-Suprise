import { Poppins } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Footer from "../components/Footer";

const Poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "800"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "WishCraft",
  description: "Create Personalized New Year Greetings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Poppins_init.variable} antialiased`}>
        {children}

        <Footer />
      </body>
    </html>
  );
}
