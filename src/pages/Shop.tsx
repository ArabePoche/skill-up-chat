
import React, { useState } from 'react';
import { Search, Filter, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tout' },
    { id: 'formations', name: 'Formations' },
    { id: 'livres', name: 'Livres' },
    { id: 'materiel', name: 'Matériel' },
    { id: 'services', name: 'Services' }
  ];

  const products = [
    {
      id: 1,
      name: 'Formation React Complete',
      category: 'formations',
      price: 299,
      originalPrice: 399,
      rating: 4.8,
      reviews: 324,
      image: '/placeholder.svg',
      author: 'Prof. Martin',
      description: 'Maîtrisez React de A à Z avec cette formation complète',
      type: 'formation'
    },
    {
      id: 2,
      name: 'Guide Mathématiques Appliquées',
      category: 'livres',
      price: 45,
      rating: 4.6,
      reviews: 156,
      image: '/placeholder.svg',
      author: 'Dr. Sophie',
      description: 'Livre de référence pour les mathématiques appliquées',
      type: 'product'
    },
    {
      id: 3,
      name: 'Coaching Personnel 1h',
      category: 'services',
      price: 80,
      rating: 4.9,
      reviews: 89,
      image: '/placeholder.svg',
      author: 'Clara Coach',
      description: 'Session de coaching personnalisé pour votre développement',
      type: 'service'
    },
    {
      id: 4,
      name: 'Formation Design Thinking',
      category: 'formations',
      price: 199,
      originalPrice: 249,
      rating: 4.7,
      reviews: 212,
      image: '/placeholder.svg',
      author: 'Design Academy',
      description: 'Apprenez les méthodes du Design Thinking',
      type: 'formation'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pt-16 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 md:top-16 z-40">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher des formations, livres, services..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-primary focus:border-transparent"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={20} />
            </Button>
          </div>

          {/* Categories */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-edu-primary text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200 bg-white">
              <CardHeader className="p-0">
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-edu-primary/10 to-edu-secondary/10 flex items-center justify-center">
                    <span className="text-gray-400">Image produit</span>
                  </div>
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Par {product.author}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl font-bold text-edu-primary">{product.price}€</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}€</span>
                  )}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                {product.type === 'formation' ? (
                  <Button className="w-full bg-edu-primary hover:bg-edu-primary/90">
                    S'inscrire
                  </Button>
                ) : (
                  <Button className="w-full" variant="outline">
                    <ShoppingCart size={16} className="mr-2" />
                    Ajouter au panier
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
