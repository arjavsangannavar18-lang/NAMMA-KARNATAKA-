import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="text-8xl mb-4">🔍</p>
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  );
}
