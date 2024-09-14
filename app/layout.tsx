import { Toaster } from "@/components/ui/toaster";
import AuthStatus from "./(components-navbar)/auth-status";
import Navbar from "./(components-navbar)/navbar";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "SpeakEZ",
  description: "SpeakEZ the only tool you need to take meeting notes and keep meetings on task.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Hydration warning suppressed because of next-themes https://github.com/pacocoursey/next-themes */}
      <body>
        <Providers>
          <div className="flex-col md:flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <Navbar className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  <AuthStatus />
                </div>
              </div>
            </div>
            {/* Conditionally display website if logged in, else display login page */}
            <div className="space-y-6 p-10 pb-16 md:block">
              <main>{children}</main>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
