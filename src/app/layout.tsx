import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-900 text-white">
        <div className="min-h-screen px-4 sm:px-20 lg:px-28 xl:px-50 py-4 sm:py-4 lg:py-4">
          {children}
        </div>
      </body>
    </html>
  );
}
