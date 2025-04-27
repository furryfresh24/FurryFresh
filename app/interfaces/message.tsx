import Pets from "./pets";

export interface Message {
  id: string;
  conversation_id: string;
  sender_pet_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  read_at?: string;

  sender_pet_profile: Pets,
}
