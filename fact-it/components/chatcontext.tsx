'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

interface Chat {
  id: string;
  name: string;
  messages: { sender: string; text: string }[];
  isMinimized: boolean; // Track if the chat is minimized
}

interface ChatContextType {
  openChats: Chat[];
  minimizedChats: string[]; // Store only ids of minimized chats
  openChat: (chat: Chat) => void;
  closeChat: (id: string) => void;
  minimizeChat: (id: string) => void; // Function to minimize chat
  restoreChat: (id: string) => void; // Function to restore minimized chat
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [openChats, setOpenChats] = useState<Chat[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<string[]>([]); // Track minimized chats

  const openChat = (chat: Chat) => {
    console.log('Opening chat:', chat);

    setOpenChats((prev) => {
      // Check if the chat already exists
      const exists = prev.find((c) => c.id === chat.id);

      if (exists) {
        // If it exists but is minimized, restore it
        if (exists.isMinimized) {
          setMinimizedChats((prevMin) =>
            prevMin.filter((id) => id !== chat.id),
          );
          return prev.map((c) =>
            c.id === chat.id ? { ...c, isMinimized: false } : c,
          );
        }
        return prev; // Chat already exists and is not minimized
      }

      // Add the new chat
      return [...prev, { ...chat, isMinimized: false }];
    });

    // Remove from minimized chats if it was there
    setMinimizedChats((prev) => prev.filter((chatId) => chatId !== chat.id));
  };

  const closeChat = (id: string) => {
    setOpenChats((prev) => prev.filter((chat) => chat.id !== id));
    setMinimizedChats((prev) => prev.filter((chatId) => chatId !== id)); // Remove from minimized chats if it's open
  };

  const minimizeChat = (id: string) => {
    setOpenChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, isMinimized: true } : chat,
      ),
    );
    setMinimizedChats((prev) => [...prev, id]); // Add to minimized chats list
  };

  const restoreChat = (id: string) => {
    setOpenChats((prev) =>
      prev.map((chat) =>
        chat.id === id ? { ...chat, isMinimized: false } : chat,
      ),
    );
    setMinimizedChats((prev) => prev.filter((chatId) => chatId !== id)); // Remove from minimized chats list
  };

  return (
    <ChatContext.Provider
      value={{
        openChats,
        minimizedChats,
        openChat,
        closeChat,
        minimizeChat,
        restoreChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
