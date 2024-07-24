interface MessageBoxModel {
  message: {
    content: string;
    createdAt: string;
    senderId?: string;
    id: number;
  };
  senderInfo: {
    name: string;
    picture?: string;
  };
  isOwnMessage: boolean;
  setMessageRef?: (el: HTMLDivElement | null) => void;
}
