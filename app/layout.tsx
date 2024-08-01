import React from "react";
import "./globals.css"; // Assurez-vous d'avoir un fichier de styles globaux

export const metadata = {
  title: "GitHub Activity Dashboard",
  description: "Visualize your GitHub activity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
