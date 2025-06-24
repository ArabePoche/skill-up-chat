
import React, { useState } from 'react';
import { ArrowLeft, Play, Users, Star, Clock } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 pb-16 md:pt-16 md:pb-0">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 md:top-16">
          <div className="flex items-center p-4">
            <button
              onClick={() => setSelectedLevel(null)}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-edu-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {selectedLevel.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="font-semibold">{selectedLevel.name}</h1>
                <p className="text-sm text-gray-600">{selectedLevel.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="p-4 space-y-2">
          {selectedLevel.lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  {lesson.completed ? (
                    <span className="text-white text-sm">✓</span>
                  ) : (
                    <Play size={14} className="text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{lesson.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock size={12} />
                    <span>{lesson.duration}</span>
                  </div>
                </div>
                {!lesson.completed && (
                  <div className="w-3 h-3 bg-edu-primary rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (selectedFormation) {
    return (
      <div className="min-h-screen bg-gray-50 pb-16 md:pt-16 md:pb-0">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 md:top-16">
          <div className="flex items-center p-4">
            <button
              onClick={() => setSelectedFormation(null)}
              className="mr-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-semibold">{selectedFormation.title}</h1>
              <p className="text-sm text-gray-600">Par {selectedFormation.author}</p>
            </div>
          </div>
        </div>

        {/* Levels List (WhatsApp Style) */}
        <div className="p-4 space-y-2">
          {selectedFormation.levels.map((level) => (
            <div
              key={level.id}
              onClick={() => setSelectedLevel(level)}
              className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-edu-secondary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {level.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{level.name}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {level.lessons.length} leçon{level.lessons.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  {level.lessons.filter(l => l.completed).length}/{level.lessons.length}
                </div>
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
              <div className="w-full h-48 bg-gradient-to-br from-edu-primary/10 to-edu-secondary/10 flex items-center justify-center">
                <Play size={40} className="text-edu-primary" />
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
                  className="bg-edu-primary h-2 rounded-full transition-all duration-300"
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
