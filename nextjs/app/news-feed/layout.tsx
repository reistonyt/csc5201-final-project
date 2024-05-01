export const metadata = {
    title: 'NewsFeedAI - News Feed',
    description: 'NewsFeed AI',
  }

export default function Layout ({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}