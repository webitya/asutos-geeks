import { Inter } from 'next/font/google';
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ConditionalLayout from "@/components/ConditionalLayout";

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata = {
  title: "Wetawork | Elite Freelance Workspace",
  description: "Find pre-vetted specialists in Finance, Legal Services, Video Animation, and Design. Built for ambitious enterprises and creative studios.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden relative min-h-screen`}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
