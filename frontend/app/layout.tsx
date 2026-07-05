import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YouTube Clone",
  description: "A local full-stack YouTube clone starter",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
