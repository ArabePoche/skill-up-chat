
import React from 'react';
import { Search, MoreVertical } from 'lucide-react';

const Messages = () => {
  const conversations = [
    {
      id: 1,
      name: 'Prof. Martin',
      lastMessage: 'Excellente réponse ! Continuez comme ça.',
      timestamp: '14:32',
      unread: 2,
      avatar: 'M',
      online: true
    },
    {
      id: 2,
      name: 'Formation React - Groupe',
      lastMessage: 'Nouvelle leçon disponible',
      timestamp: '12:15',
      unread: 0,
      avatar: 'R',
      online: false
    },
    {
      id: 3,
      name: 'Dr. Sophie',
      lastMessage: 'Rappel: exercice à rendre demain',
      timestamp: 'Hier',
      unread: 1,
      avatar: 'S',
      online: false
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-16 md:pt-16 md:pb-0">
      {/* Header */}
      <div className="bg-edu-whatsapp-green text-white p-4 sticky top-0 md:top-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Messages</h1>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-gray-50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher dans les conversations..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-edu-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="divide-y divide-gray-100">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="relative mr-3">
              <div className="w-12 h-12 bg-edu-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{conversation.avatar}</span>
              </div>
              {conversation.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                <span className="text-xs text-gray-500 flex-shrink-0">{conversation.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
            </div>
            
            {conversation.unread > 0 && (
              <div className="ml-2 bg-edu-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
