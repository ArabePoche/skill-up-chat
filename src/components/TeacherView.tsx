
import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, User, Clock, CheckCircle } from 'lucide-react';
import ChatInterface from './ChatInterface';

interface Student {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  progress: number;
}

interface TeacherViewProps {
  formation: {
    id: number;
    title: string;
    author: string;
  };
  onBack: () => void;
}

const TeacherView: React.FC<TeacherViewProps> = ({ formation, onBack }) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Données simulées des élèves inscrits
  const students: Student[] = [
    {
      id: 1,
      name: 'Marie Dupont',
      avatar: '👩‍🎓',
      lastMessage: 'J\'ai terminé l\'exercice 1, voici ma photo',
      timestamp: '14:32',
      unread: 2,
      progress: 45
    },
    {
      id: 2,
      name: 'Jean Martin',
      avatar: '👨‍🎓',
      lastMessage: 'Pouvez-vous m\'expliquer cette partie ?',
      timestamp: '13:45',
      unread: 1,
      progress: 30
    },
    {
      id: 3,
      name: 'Sarah Ahmed',
      avatar: '👩‍💼',
      lastMessage: 'Exercice envoyé en vidéo',
      timestamp: 'Hier',
      unread: 0,
      progress: 60
    }
  ];

  if (selectedStudent) {
    // Créer une leçon simulée pour le chat avec l'étudiant
    const studentLesson = {
      id: 1,
      title: `Discussion avec ${selectedStudent.name}`,
      completed: false,
      duration: 'En cours'
    };

    return (
      <ChatInterface
        lesson={studentLesson}
        onBack={() => setSelectedStudent(null)}
        isTeacherView={true}
        studentName={selectedStudent.name}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#e5ddd5] pb-16 md:pt-16 md:pb-0">
      {/* Header - Style WhatsApp pour prof */}
      <div className="bg-[#25d366] text-white sticky top-0 md:top-16 z-40">
        <div className="flex items-center p-4">
          <button
            onClick={onBack}
            className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">👨‍🏫</span>
          </div>
          <div>
            <h1 className="font-semibold text-lg">{formation.title}</h1>
            <p className="text-sm text-white/80">Vue Professeur • {students.length} élèves</p>
          </div>
        </div>
      </div>

      {/* Liste des élèves - Style WhatsApp */}
      <div className="divide-y divide-gray-200">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => setSelectedStudent(student)}
            className="bg-white hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center p-4">
              <div className="w-12 h-12 bg-[#25d366] rounded-full flex items-center justify-center mr-3 text-lg">
                {student.avatar}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0">{student.timestamp}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">{student.lastMessage}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-[#25d366] h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{student.progress}%</span>
                </div>
              </div>
              
              <div className="ml-2 flex items-center space-x-2">
                {student.unread > 0 && (
                  <div className="bg-[#25d366] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {student.unread}
                  </div>
                )}
                <MessageCircle size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherView;
