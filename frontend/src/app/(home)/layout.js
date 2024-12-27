import { Poppins } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import SnowEffect from "../components/SnowEffect";
import { Toaster } from "react-hot-toast";

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
        <Providers>
          <SnowEffect />
          <Toaster position="bottom-center" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
