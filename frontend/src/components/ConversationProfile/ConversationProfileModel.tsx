export interface ConversationProps {
  id: number;
  name: string;
  picture: string | null;
  isGroup: boolean;
  createdAt: string;
}

export interface ParticipantProps {
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