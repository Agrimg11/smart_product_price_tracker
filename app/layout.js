import "./globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Dealdrop",
  description: "Price tracker platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}
        <Toaster richColors/>
      </body>
    </html>
  );
}
