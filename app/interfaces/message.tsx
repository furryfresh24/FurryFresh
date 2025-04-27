export interface Message {
  id: string;
  conversation_id: string;
  sender_pet_id: string;
  content: string;
  created_at: string; // 🕒 from Supabase (ISO string)
  is_read: boolean;
  read_at?: string; // 🕒 optional (null if not yet read)
}
