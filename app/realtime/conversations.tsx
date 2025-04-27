import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePet } from '../context/pet_context';
import { Conversation } from '../interfaces/conversation';
import supabase from '../utils/supabase';

interface ConversationsContextType {
  newConversations: Conversation[];
  setNewConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
}

const ConversationsContext = createContext<ConversationsContextType | undefined>(undefined);

export const ConversationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pets } = usePet();
  const [newConversations, setNewConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const myPetIds = pets.map((pet) => pet.id);

    if (myPetIds.length === 0) return;

    const channel = supabase
      .channel('global_conversations')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'playdate_conversations',
        },
        (payload) => {
          const conversation = payload.new as Conversation;

          if (myPetIds.includes(conversation.pet_1_id) || myPetIds.includes(conversation.pet_2_id)) {
            setNewConversations((prev) => [...prev, conversation]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pets]);

  return (
    <ConversationsContext.Provider value={{ newConversations, setNewConversations }}>
      {children}
    </ConversationsContext.Provider>
  );
};

export function useConversations() {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error('useConversations must be used within a ConversationsProvider');
  }
  return context;
}
