'use client';

import { useChat } from './chatcontext';
import { X, Minus, Send } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const FloatingChat = () => {
  const { openChats, minimizedChats, closeChat, minimizeChat, restoreChat } =
    useChat();
  const [message, setMessage] = useState<string>('');

  console.log('FloatingChat rendering:', { openChats, minimizedChats });

  const handleSendMessage = (chatId: string) => {
    if (!message.trim()) return;

    const updatedMessage = {
      sender: 'me',
      text: message,
    };

    console.log(`Sending message to chat ID ${chatId}:`, updatedMessage);

    setMessage('');
  };

  return (
    <div className="fixed bottom-4 right-10 flex flex-col gap-3 z-50">
      {/* Open Chats */}
      {openChats.map((chat) => (
        <div
          key={chat.id}
          className={`w-80 bg-white shadow-lg rounded-lg border ${chat.isMinimized ? 'hidden' : ''}`}
        >
          <div className="flex justify-between items-center bg-secondary text-white p-2 rounded-t-lg">
            <span>{chat.name}</span>
            <div className="flex gap-2">
              <button onClick={() => minimizeChat(chat.id)}>
                <Minus size={18} />
              </button>
              <button onClick={() => closeChat(chat.id)}>
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="p-4 h-75 overflow-y-auto">
            {chat.messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                {/* Profile photo of the sender */}
                {msg.sender !== 'me' && (
                  <Image
                    src="/Default_pfp.svg"
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full border-1"
                    width={32} // added width and height for better optimization
                    height={32}
                  />
                )}
                {/* Message content */}
                <div
                  className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <p
                    className={`text-[14px] p-2 ml-2 mr-2 rounded-3xl ${
                      msg.sender === 'me' ? 'bg-blue-200' : 'bg-gray-200'
                    }`}
                  >
                    {msg.text}
                  </p>
                </div>
                {msg.sender === 'me' && (
                  <Image
                    src="/Default_pfp.svg"
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full border-1"
                    width={32}
                    height={32}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-gray-300 flex items-center gap-2 text-[14px]">
            <input
              type="text"
              placeholder="Type a message..."
              className="w-full p-2 border rounded-4xl focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={() => handleSendMessage(chat.id)}
              disabled={!message.trim()}
            >
              <Send size={20} className="text-secondary" />
            </button>
          </div>
        </div>
      ))}

      {/* Minimized Chats as Floating Bubble */}
      {minimizedChats.map((chatId) => {
        const chat = openChats.find((chat) => chat.id === chatId);
        if (!chat) return null;
        return (
          <div
            key={chat.id}
            className="fixed bottom-4 right-4 p-3 bg-blue-500 rounded-full text-white cursor-pointer"
            onClick={() => restoreChat(chat.id)}
          >
            <span>{chat.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingChat;
