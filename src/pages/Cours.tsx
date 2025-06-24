
import React, { useState } from 'react';
import { ArrowLeft, Play, Users, Star, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatInterface from '@/components/ChatInterface';

const Cours = () => {
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Données de démonstration
  const formations = [
    {
      id: 1,
      title: 'Formation React Complete',
      author: 'Prof. Martin',
      image: '/placeholder.svg',
      progress: 65,
      students: 324,
      rating: 4.8,
      levels: [
        {
          id: 1,
          name: 'Niveau Débutant',
          avatar: '/placeholder.svg',
          description: 'Bases de React',
          lastMessage: 'Introduction aux composants terminée',
          timestamp: '14:32',
          unread: 2,
          lessons: [
            { id: 1, title: 'Introduction à React', completed: true, duration: '15 min' },
            { id: 2, title: 'Composants et Props', completed: true, duration: '20 min' },
            { id: 3, title: 'État et Hooks', completed: false, duration: '25 min' }
          ]
        },
        {
          id: 2,
          name: 'Niveau Intermédiaire',
          avatar: '/placeholder.svg',
          description: 'Concepts avancés',
          lastMessage: 'Context API - Exercice en attente',
          timestamp: 'Hier',
          unread: 0,
          lessons: [
            { id: 4, title: 'Context API', completed: false, duration: '30 min' },
            { id: 5, title: 'Gestion d\'état', completed: false, duration: '35 min' }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Design Thinking Workshop',
      author: 'Clara Design',
      image: '/placeholder.svg',
      progress: 30,
      students: 156,
      rating: 4.9,
      levels: [
        {
          id: 3,
          name: 'Introduction',
          avatar: '/placeholder.svg',
          description: 'Bases du Design Thinking',
          lastMessage: 'Nouveau exercice disponible',
          timestamp: '09:15',
          unread: 1,
          lessons: [
            { id: 6, title: 'Qu\'est-ce que le Design Thinking ?', completed: true, duration: '12 min' },
            { id: 7, title: 'Les 5 étapes', completed: false, duration: '18 min' }
          ]
        }
      ]
    }
  ];

  if (selectedLesson) {
    return (
      <ChatInterface
        lesson={selectedLesson}
        onBack={() => setSelectedLesson(null)}
      />
    );
  }

  if (selectedLevel) {
    return (
      <div className="min-h-screen bg-[#e5ddd5] pb-16 md:pt-16 md:pb-0">
        {/* Header - Style WhatsApp */}
        <div className="bg-[#25d366] text-white sticky top-0 md:top-16 z-40">
          <div className="flex items-center p-4">
            <button
              onClick={() => setSelectedLevel(null)}
              className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">
                {selectedLevel.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-lg">{selectedLevel.name}</h1>
              <p className="text-sm text-white/80">{selectedLevel.description}</p>
            </div>
          </div>
        </div>

        {/* Lessons List - Style WhatsApp */}
        <div className="divide-y divide-gray-200">
          {selectedLevel.lessons.map((lesson, index) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center p-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${
                  lesson.completed ? 'bg-[#25d366]' : 'bg-gray-300'
                }`}>
                  {lesson.completed ? (
                    <span className="text-white text-lg">✓</span>
                  ) : (
                    <Play size={16} className="text-gray-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{lesson.title}</h3>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 flex-shrink-0">
                      <Clock size={12} />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {lesson.completed ? 'Leçon terminée' : 'En cours'}
                  </p>
                </div>
                
                <ChevronRight size={16} className="text-gray-400 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedFormation) {
    return (
      <div className="min-h-screen bg-[#e5ddd5] pb-16 md:pt-16 md:pb-0">
        {/* Header - Style WhatsApp */}
        <div className="bg-[#25d366] text-white sticky top-0 md:top-16 z-40">
          <div className="flex items-center p-4">
            <button
              onClick={() => setSelectedFormation(null)}
              className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">
                {selectedFormation.title.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="font-semibold text-lg">{selectedFormation.title}</h1>
              <p className="text-sm text-white/80">Par {selectedFormation.author}</p>
            </div>
          </div>
        </div>

        {/* Levels List - Style WhatsApp */}
        <div className="divide-y divide-gray-200">
          {selectedFormation.levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level)}
              className="bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center p-4">
                <div className="w-12 h-12 bg-[#25d366] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">
                    {level.name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">{level.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{level.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{level.lastMessage}</p>
                </div>
                
                {level.unread > 0 && (
                  <div className="ml-2 bg-[#25d366] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {level.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pt-16 md:pb-0">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 md:top-16">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Mes Formations</h1>
          <p className="text-gray-600">Continuez votre apprentissage</p>
        </div>
      </div>

      {/* Formations Cards */}
      <div className="p-4 space-y-4">
        {formations.map((formation) => (
          <div
            key={formation.id}
            onClick={() => setSelectedFormation(formation)}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-[#25d366]/10 to-[#20c75a]/10 flex items-center justify-center">
                <Play size={40} className="text-[#25d366]" />
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {formation.progress}% complété
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{formation.title}</h3>
              <p className="text-sm text-gray-600 mb-3">Par {formation.author}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <Users size={14} />
                  <span>{formation.students} étudiants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span>{formation.rating}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#25d366] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${formation.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cours;
