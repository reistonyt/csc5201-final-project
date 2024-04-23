import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'NewsAgg',
  description: 'NewsAgg page',
}


import NavigationBar from '@/components/NavigationBar';

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
      </body>
    </html>
  )
}
