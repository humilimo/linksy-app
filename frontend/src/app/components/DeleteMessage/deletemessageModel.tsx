interface MessageBoxModel {
    Deletemessage: {
        erasedById: string,
        conversationId: string,
        messageId: string,
       
    };
    
    isOwnMessage: boolean;
    setMessageRef?: (el: HTMLDivElement | null) => void;
  }
  