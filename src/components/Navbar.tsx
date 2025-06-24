
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, BookOpen, MessageSquare, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: ShoppingBag, label: 'Shop', path: '/shop' },
    { icon: BookOpen, label: 'Cours', path: '/cours' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profil', path: '/profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="flex justify-around items-center md:justify-center md:space-x-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-edu-primary bg-edu-primary/10'
                  : 'text-gray-600 hover:text-edu-primary hover:bg-gray-50'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'animate-bounce-subtle' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
