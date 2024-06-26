import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'NewsFeed AI - Home',
  description: 'NewsFeed AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NavigationBar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
