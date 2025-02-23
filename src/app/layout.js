import "./globals.css";
import Navbar from "@/components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Racing+Sans+One&display=swap"
            rel="stylesheet"
          />      
      </head>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
