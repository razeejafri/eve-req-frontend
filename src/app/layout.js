import "./globals.css";

export const metadata = {
  title: "Event Requirement Posting",
  description: "Post your event requirements easily",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
