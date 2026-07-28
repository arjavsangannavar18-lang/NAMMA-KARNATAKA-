import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

export default function NewsPage() {
  const { data: news, isLoading } = useQuery({
    queryKey: ['news', 'all'],
    queryFn: () => apiService.getNews(),
    staleTime: 15 * 60 * 1000,
  });

  return (
    <div className="space-y-6">
      <h1 className="section-title">📰 Karnataka News</h1>
      {isLoading && <div className="flex justify-center py-10"><div className="loading-spinner" /></div>}
      {news && news.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {news.map((item, idx) => (
            <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="card p-5 hover:no-underline">
              <h3 className="font-bold text-lg mb-2 leading-snug">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{item.description || ''}</p>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{item.source}</span><span>{item.publishedAt}</span>
              </div>
            </a>
          ))}
        </div>
      ) : !isLoading ? (
        <div className="card text-center py-10"><p className="text-gray-500">No news available at the moment.</p></div>
      ) : null}
    </div>
  );
}
