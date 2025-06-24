
import React, { useState } from 'react';
import { Smile } from 'lucide-react';

const emojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '😊',
  '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛',
  '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳',
  '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖',
  '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
  '🔥', '💯', '💪', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔'
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="p-2 text-gray-500 hover:text-[#25d366] transition-colors rounded-full hover:bg-gray-100"
      >
        <Smile size={20} />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-4 w-80 max-h-60 overflow-y-auto custom-scrollbar z-50">
          <div className="grid grid-cols-8 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  onEmojiSelect(emoji);
                  onToggle();
                }}
                className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
