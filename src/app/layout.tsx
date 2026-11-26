import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getConfig } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Felix's United States Marine Corps", template: "%s | Felix's USMC" },
  description: "Felix's United States Marine Corps — a Roblox military simulation community. Honor, Courage, Commitment.",
};
export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cfg = await getConfig().catch(() => null);
  const user = await getCurrentUser().catch(() => null);
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header bannerText={cfg?.bannerText} loggedIn={!!user} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
