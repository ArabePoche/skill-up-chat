
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Mic, Camera, Paperclip, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  const [messages, setMessages] = useState([
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
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: message,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate teacher response
      setTimeout(() => {
        const teacherResponse = {
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-edu-whatsapp-green text-white p-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-3 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="font-semibold">{lesson.title}</h1>
            <p className="text-xs text-green-100">Leçon interactive • {lesson.duration}</p>
          </div>
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
                <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {msg.content}
                </span>
              </div>
            )}

            {msg.type === 'exercise' && (
              <div className="flex justify-start">
                <div className="chat-bubble chat-bubble-received max-w-xs">
                  <div className="mb-2">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-edu-primary rounded text-white text-xs flex items-center justify-center">
                        📝
                      </div>
                      <span className="text-sm font-medium text-edu-primary">Exercice</span>
                    </div>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  
                  {msg.fileType && (
                    <div className="bg-gray-100 rounded p-3 border">
                      <div className="flex items-center space-x-2">
                        {msg.fileType === 'image' && <Camera size={16} className="text-gray-500" />}
                        {msg.fileType === 'video' && <Play size={16} className="text-gray-500" />}
                        <span className="text-sm text-gray-600">{msg.fileName}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            )}

            {msg.type === 'user' && (
              <div className="flex justify-end">
                <div className="chat-bubble chat-bubble-sent">
                  <p className="text-sm">{msg.content}</p>
                  <div className="text-xs text-white/70 mt-1">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            )}

            {msg.type === 'teacher' && (
              <div className="flex justify-start">
                <div className="chat-bubble chat-bubble-received">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-5 h-5 bg-edu-secondary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👨‍🏫</span>
                    </div>
                    <span className="text-xs font-medium text-edu-secondary">{msg.author}</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-500 hover:text-edu-primary transition-colors">
            <Paperclip size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-edu-primary transition-colors">
            <Camera size={20} />
          </button>
          
          <div className="flex-1 flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Tapez votre réponse..."
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="p-1 text-gray-500 hover:text-edu-primary transition-colors">
              <Mic size={18} />
            </button>
          </div>
          
          <Button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-edu-primary hover:bg-edu-primary/90 p-2 rounded-full"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
