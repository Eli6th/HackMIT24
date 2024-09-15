import { Toaster } from "@/components/ui/toaster";
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
            <main className="min-h-screen">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
