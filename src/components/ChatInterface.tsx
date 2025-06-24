
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, Camera, Paperclip, Play, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  type: 'system' | 'exercise' | 'user' | 'teacher';
  content: string;
  timestamp: Date;
  fileType?: string;
  fileName?: string;
  author?: string;
}

interface ChatInterfaceProps {
  lesson: {
    id: number;
    title: string;
    completed: boolean;
    duration: string;
  };
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ lesson, onBack }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'system',
      content: 'Bienvenue dans cette leçon ! Regardez d\'abord la vidéo ci-dessus.',
      timestamp: new Date(Date.now() - 5 * 60000)
    },
    {
      id: 2,
      type: 'exercise',
      content: 'Exercice 1: Créez votre premier composant React',
      fileType: 'image',
      fileName: 'exercice-1.png',
      timestamp: new Date(Date.now() - 3 * 60000)
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        type: 'user',
        content: message,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate teacher response
      setTimeout(() => {
        const teacherResponse: Message = {
          id: messages.length + 2,
          type: 'teacher',
          content: 'Excellente réponse ! Votre compréhension est correcte. Vous pouvez passer au prochain exercice.',
          author: 'Prof. Martin',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, teacherResponse]);
      }, 2000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-[#e5ddd5] flex flex-col">
      {/* Header - Style WhatsApp */}
      <div className="bg-[#25d366] text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">
              {lesson.title.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">{lesson.title}</h1>
            <p className="text-xs text-white/80">Leçon interactive • {lesson.duration}</p>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="bg-black p-4">
        <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative">
          <Play size={60} className="text-white/70" />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {lesson.duration}
          </div>
        </div>
      </div>

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
                  
                  {/* WhatsApp tail */}
                  <div className="absolute left-0 top-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-white border-b-[8px] border-b-transparent transform -translate-x-2"></div>
                </div>
              </div>
            )}

            {msg.type === 'user' && (
              <div className="flex justify-end">
                <div className="bg-[#dcf8c6] rounded-lg shadow-sm max-w-xs p-3 relative">
                  <p className="text-sm text-gray-800">{msg.content}</p>
                  <div className="text-xs text-gray-500 mt-1 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                  
                  {/* WhatsApp tail */}
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
                  
                  {/* WhatsApp tail */}
                  <div className="absolute left-0 top-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-white border-b-[8px] border-b-transparent transform -translate-x-2"></div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Style WhatsApp */}
      <div className="bg-[#f0f0f0] border-t border-gray-200 p-2">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-[#25d366] transition-colors rounded-full hover:bg-gray-200">
            <Paperclip size={20} />
          </button>
          
          <div className="flex-1 flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tapez votre réponse..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="p-1 text-gray-500 hover:text-[#25d366] transition-colors">
              <Mic size={18} />
            </button>
          </div>
          
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-[#25d366] hover:bg-[#20c75a] p-3 rounded-full shadow-lg"
            size="icon"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
