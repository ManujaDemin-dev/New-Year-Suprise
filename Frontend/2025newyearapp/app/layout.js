import { Poppins } from "next/font/google";
import "./globals.css";


const Poppins_init = Poppins({
  subsets: ['latin'],
  weight: ["100","200","300","400","500","800"],
  variable: '--font-poppins',
});



// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "WishCraft",
  description: "Create Personalized New Year Greetings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Poppins_init.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
