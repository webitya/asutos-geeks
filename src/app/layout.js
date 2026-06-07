import { Inter } from 'next/font/google';
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata = {
  title: "Asutos Geeks | Elite Freelance Workspace",
  description: "Find pre-vetted specialists in Finance, Legal Services, Video Animation, and Design. Built for ambitious enterprises and creative studios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
