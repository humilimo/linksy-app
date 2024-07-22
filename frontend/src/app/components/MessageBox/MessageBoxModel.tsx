interface MessageBoxModel {
  message: {
    content: string;
    createdAt: string;
    senderId?: string;
  };
  senderInfo: {
    name: string;
    picture?: string;
  };
  isOwnMessage: boolean;
}
