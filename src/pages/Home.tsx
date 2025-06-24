
import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [activeTab, setActiveTab] = useState('videos');

  // Données de démonstration
  const videos = [
    {
      id: 1,
      title: 'Formation React Avancé',
      author: 'Prof. Martin',
      thumbnail: '/placeholder.svg',
      duration: '2:34',
      type: 'promo',
      likes: 245,
      comments: 18,
    },
    {
      id: 2,
      title: 'Mathématiques Appliquées',
      author: 'Dr. Sophie',
      thumbnail: '/placeholder.svg',
      duration: '1:58',
      type: 'educational',
      likes: 189,
      comments: 12,
    },
    {
      id: 3,
      title: 'Design Thinking Workshop',
      author: 'Clara Design',
      thumbnail: '/placeholder.svg',
      duration: '3:12',
      type: 'promo',
      likes: 367,
      comments: 24,
    },
  ];

  const posts = [
    {
      id: 1,
      author: 'Prof. Martin',
      content: 'Nouvelle méthodologie d\'apprentissage révolutionnaire ! 🎯',
      image: '/placeholder.svg',
      likes: 45,
      comments: 8,
    },
    {
      id: 2,
      author: 'Dr. Sophie',
      content: 'Les secrets des mathématiques quantiques expliqués simplement',
      likes: 67,
      comments: 15,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-16 md:pt-16 md:pb-0">
      {/* Tabs Header */}
      <div className="sticky top-0 md:top-16 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="flex justify-center space-x-8 py-4">
          {['videos', 'posts', 'rechercher'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-all duration-200 ${
                activeTab === tab
                  ? 'text-white border-b-2 border-edu-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        {activeTab === 'videos' && (
          <div className="space-y-0">
            {videos.map((video, index) => (
              <div key={video.id} className="relative h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-edu-primary/20 to-edu-secondary/20 flex items-center justify-center">
                    <Play size={80} className="text-white/80" />
                  </div>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-20 left-4 right-20 z-10">
                  <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">Par {video.author}</p>
                  
                  {video.type === 'promo' && (
                    <Button className="bg-edu-primary hover:bg-edu-primary/90 text-white px-6 py-2 rounded-full">
                      S'inscrire
                    </Button>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-20 right-4 flex flex-col space-y-4 z-10">
                  <button className="flex flex-col items-center text-white hover:text-edu-primary transition-colors">
                    <Heart size={28} />
                    <span className="text-xs mt-1">{video.likes}</span>
                  </button>
                  <button className="flex flex-col items-center text-white hover:text-edu-primary transition-colors">
                    <MessageCircle size={28} />
                    <span className="text-xs mt-1">{video.comments}</span>
                  </button>
                  <button className="flex flex-col items-center text-white hover:text-edu-primary transition-colors">
                    <Share size={28} />
                    <span className="text-xs mt-1">Partager</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="p-4 space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-edu-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{post.author}</h4>
                    <p className="text-xs text-gray-400">Il y a 2h</p>
                  </div>
                </div>
                
                <p className="text-gray-100 mb-3">{post.content}</p>
                
                {post.image && (
                  <div className="w-full h-48 bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-gray-400">Image placeholder</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-6 text-gray-400">
                  <button className="flex items-center space-x-1 hover:text-edu-primary transition-colors">
                    <Heart size={16} />
                    <span className="text-sm">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-edu-primary transition-colors">
                    <MessageCircle size={16} />
                    <span className="text-sm">{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rechercher' && (
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-6">
              <input
                type="text"
                placeholder="Rechercher une formation, un sujet..."
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-edu-primary"
              />
              <Button className="bg-edu-primary hover:bg-edu-primary/90 px-6 py-3">
                Rechercher
              </Button>
            </div>
            
            <div className="text-center py-12">
              <p className="text-gray-400">Commencez à taper pour rechercher...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
