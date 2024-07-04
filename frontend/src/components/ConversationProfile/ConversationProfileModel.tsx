export interface Conversation {
  id: number;
  name: string;
  picture: string | null;
  isGroup: boolean;
  createdAt: string;
}

export interface Participant {
  id: number;
  name: string;
  username: string;
  picture: string | null;
}

export interface UserProps{
  id: number;
  name: string;
  username: string;
  picture: string | null;
  email: string,
  bio: string | null
}

export interface ConversationProfileProps {
  owner: boolean;
  conversation: Conversation;
  participants: Participant[];
}