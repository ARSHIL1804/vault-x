import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div className="px-2 w-full h-full">
    {children}
  </div>
  );
}

