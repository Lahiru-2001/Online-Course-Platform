import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Hide breadcrumb on root Landing page
  if (location.pathname === '/') return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 py-3.5 px-6 bg-white border-b border-gray-200">
      <Link to="/" className="hover:text-orange-500 flex items-center gap-1.5 transition-colors">
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = value
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="font-semibold text-gray-800">{formattedName}</span>
            ) : (
              <Link to={to} className="hover:text-orange-500 transition-colors">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
