import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, Camera, Paperclip, Play, MoreVertical, Phone, Video, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EmojiPicker from './EmojiPicker';

interface Message {
  id: number;
  type: 'system' | 'exercise' | 'user' | 'teacher';
  content: string;
  timestamp: Date;
  fileType?: string;
  fileName?: string;
  author?: string;
  isValidated?: boolean;
  canValidate?: boolean;
}

interface ChatInterfaceProps {
  lesson: {
    id: number;
    title: string;
    completed: boolean;
    duration: string;
  };
  onBack: () => void;
  isTeacherView?: boolean;
  studentName?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lesson, onBack, isTeacherView = false, studentName }) => {
  const [message, setMessage] = useState('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'system',
      content: isTeacherView 
        ? `Discussion avec ${studentName}` 
        : 'Bienvenue dans cette leçon ! Regardez d\'abord la vidéo ci-dessus.',
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: 2,
      type: 'exercise',
      content: 'Exercice 1: Créez votre premier composant React',
      fileType: 'image',
      fileName: 'exercice-1.png',
      timestamp: new Date(Date.now() - 3 * 60000),
      canValidate: isTeacherView
    },
    ...(isTeacherView ? [{
      id: 3,
      type: 'user' as const,
      content: 'Voici mon exercice terminé !',
      fileType: 'image',
      fileName: 'mon-exercice.jpg',
      timestamp: new Date(Date.now() - 1 * 60000),
      canValidate: true
    }] : [])
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Données simulées des profs en ligne
  const onlineTeachers = [
    { id: 1, name: 'Prof. Martin', avatar: '👨‍🏫' },
    { id: 2, name: 'Dr. Sarah', avatar: '👩‍🏫' },
    { id: 3, name: 'Prof. Ahmed', avatar: '👨‍💼' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: isTeacherView ? 'teacher' : 'user',
        content: message,
        author: isTeacherView ? 'Prof. Martin' : undefined,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate response only if not teacher view
      if (!isTeacherView) {
        setTimeout(() => {
          const randomTeacher = onlineTeachers[Math.floor(Math.random() * onlineTeachers.length)];
          const teacherResponse: Message = {
            id: messages.length + 2,
            type: 'teacher',
            content: 'Excellente réponse ! Votre compréhension est correcte. Vous pouvez passer au prochain exercice.',
            author: randomTeacher.name,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, teacherResponse]);
        }, 2000);
      }
    }
  };

  const validateExercise = (messageId: number, isValid: boolean) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isValidated: isValid, canValidate: false }
        : msg
    ));

    // If validated, add next exercise
    if (isValid) {
      setTimeout(() => {
        const nextExercise: Message = {
          id: messages.length + 10,
          type: 'exercise',
          content: 'Exercice 2: Ajoutez des props à votre composant',
          fileType: 'video',
          fileName: 'exercice-2-demo.mp4',
          timestamp: new Date(),
          canValidate: isTeacherView
        };
        setMessages(prev => [...prev, nextExercise]);
      }, 1000);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage(prev => prev + emoji);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: messages.length + 1,
        type: isTeacherView ? 'teacher' : 'user',
        content: `Fichier envoyé: ${file.name}`,
        fileType: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'file',
        fileName: file.name,
        author: isTeacherView ? 'Prof. Martin' : undefined,
        timestamp: new Date(),
        canValidate: !isTeacherView
      };
      setMessages([...messages, newMessage]);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Ici vous pourriez implémenter la logique d'enregistrement vocal
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-[#e5ddd5] flex flex-col">
      {/* Header - Style WhatsApp avec profs en ligne */}
      <div className="bg-[#25d366] text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button
              onClick={onBack}
              className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">
                {isTeacherView ? '👨‍🏫' : lesson.title.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-lg truncate">{lesson.title}</h1>
              <p className="text-xs text-white/80">
                {isTeacherView 
                  ? `Discussion avec ${studentName}`
                  : `${onlineTeachers.length} prof${onlineTeachers.length > 1 ? 's' : ''} en ligne • ${lesson.duration}`
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Video size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Phone size={20} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        
        {/* Indicateur des profs en ligne - seulement pour vue élève */}
        {!isTeacherView && (
          <div className="flex items-center space-x-2 mt-2">
            {onlineTeachers.map((teacher) => (
              <div key={teacher.id} className="flex items-center bg-white/10 rounded-full px-2 py-1">
                <span className="text-xs mr-1">{teacher.avatar}</span>
                <span className="text-xs">{teacher.name.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Section - seulement pour vue élève */}
      {!isTeacherView && (
        <div className="bg-black p-4">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
            <Play size={60} className="text-white/70" />
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {lesson.duration}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 custom-scrollbar overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="message-appear">
            {msg.type === 'system' && (
              <div className="text-center">
                <span className="bg-[#dcf8c6] text-gray-700 px-3 py-2 rounded-lg text-sm shadow-sm">
                  {msg.content}
                </span>
              </div>
            )}

            {msg.type === 'exercise' && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg shadow-sm max-w-xs p-3 relative">
                  <div className="mb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-[#25d366] rounded text-white text-xs flex items-center justify-center">
                        📝
                      </div>
                      <span className="text-sm font-medium text-[#25d366]">Exercice</span>
                    </div>
                    <p className="text-sm text-gray-800">{msg.content}</p>
                  </div>
                  
                  {msg.fileType && (
                    <div className="bg-gray-50 rounded p-3 border">
                      <div className="flex items-center space-x-2">
                        {msg.fileType === 'image' && <Camera size={16} className="text-gray-500" />}
                        {msg.fileType === 'video' && <Play size={16} className="text-gray-500" />}
                        <span className="text-sm text-gray-600">{msg.fileName}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                  
                  <div className="absolute left-0 top-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-white border-b-[8px] border-b-transparent transform -translate-x-2"></div>
                </div>
              </div>
            )}

            {msg.type === 'user' && (
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-lg shadow-sm max-w-xs p-3 relative">
                  <p className="text-sm text-gray-800">{msg.content}</p>
                  {msg.fileType && (
                    <div className="bg-white/50 rounded p-2 mt-2 border">
                      <div className="flex items-center space-x-2">
                        {msg.fileType === 'image' && <Camera size={14} className="text-gray-600" />}
                        {msg.fileType === 'video' && <Play size={14} className="text-gray-600" />}
                        <span className="text-xs text-gray-600">{msg.fileName}</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Boutons de validation pour les profs */}
                  {isTeacherView && msg.canValidate && !msg.isValidated && (
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => validateExercise(msg.id, true)}
                        className="flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                      >
                        <CheckCircle size={12} />
                        <span>Valider</span>
                      </button>
                      <button
                        onClick={() => validateExercise(msg.id, false)}
                        className="flex items-center space-x-1 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        <XCircle size={12} />
                        <span>Refuser</span>
                      </button>
                    </div>
                  )}
                  
                  {/* Indicateur de validation */}
                  {msg.isValidated !== undefined && (
                    <div className={`flex items-center space-x-1 mt-2 text-xs ${
                      msg.isValidated ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {msg.isValidated ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      <span>{msg.isValidated ? 'Validé' : 'Refusé'}</span>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                  
                  <div className="absolute right-0 top-0 w-0 h-0 border-l-[8px] border-l-[#dcf8c6] border-r-[8px] border-r-transparent border-b-[8px] border-b-transparent transform translate-x-2"></div>
                </div>
              </div>
            )}

            {msg.type === 'teacher' && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg shadow-sm max-w-xs p-3 relative">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 bg-[#25d366] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👨‍🏫</span>
                    </div>
                    <span className="text-xs font-medium text-[#25d366]">{msg.author}</span>
                  </div>
                  <p className="text-sm text-gray-800">{msg.content}</p>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                  
                  <div className="absolute left-0 top-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-white border-b-[8px] border-b-transparent transform -translate-x-2"></div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar complète - Style WhatsApp */}
      <div className="bg-[#f0f0f0] border-t border-gray-200 p-2">
        <div className="flex items-end space-x-2">
          {/* Paperclip pour fichiers */}
          <button 
            onClick={handleFileUpload}
            className="p-2 text-gray-500 hover:text-[#25d366] transition-colors rounded-full hover:bg-gray-200"
          >
            <Paperclip size={20} />
          </button>
          
          {/* Input invisible pour les fichiers */}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            onChange={handleFileSelect}
          />
          
          {/* Zone de texte principale */}
          <div className="flex-1 flex items-end space-x-2 bg-white rounded-3xl px-3 py-2 shadow-sm min-h-[44px]">
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              isOpen={isEmojiPickerOpen}
              onToggle={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            />
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Tapez votre message..."
              className="flex-1 bg-transparent outline-none text-sm resize-none max-h-20 py-2"
              rows={1}
              style={{
                minHeight: '20px',
                height: 'auto'
              }}
            />
            
            <button 
              onClick={handleFileUpload}
              className="p-1 text-gray-500 hover:text-[#25d366] transition-colors"
            >
              <Camera size={18} />
            </button>
          </div>
          
          {/* Bouton d'envoi ou micro */}
          {message.trim() ? (
            <Button
              onClick={sendMessage}
              className="bg-[#25d366] hover:bg-[#20c75a] p-3 rounded-full shadow-lg min-w-[44px] h-[44px]"
              size="icon"
            >
              <Send size={18} />
            </Button>
          ) : (
            <button
              onClick={toggleRecording}
              className={`p-3 rounded-full shadow-lg min-w-[44px] h-[44px] transition-colors ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-[#25d366] hover:bg-[#20c75a] text-white'
              }`}
            >
              <Mic size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
