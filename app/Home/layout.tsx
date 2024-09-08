import React from "react";
import "../globals.css"; // Assurez-vous d'avoir un fichier de styles globaux

export default function Authentication_API({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
