interface MessageInputModel {
    onMessageSent: (message: string) => void;
    loggedId: string;
    conversationId: string;
  }