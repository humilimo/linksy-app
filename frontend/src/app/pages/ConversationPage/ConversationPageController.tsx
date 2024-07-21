import { useEffect, useState } from "react";
import axiosAuthInstance from "../../../API/axiosAuthInstance";
import { useParams } from "react-router-dom";

const useConversationPage = (model: ConversationPageModel) => {
  const [conversation, setConversation] = useState<ConversationPageModel>(
    model || {}
  );
  const { loggedId, conversationId } = useParams<{
    loggedId: string;
    conversationId: string;
  }>();
  const fetchConversationMessages = async () => {
    if (loggedId && conversationId) {
      try {
        const response = await axiosAuthInstance.get<ConversationPageModel>(
          `/user/${loggedId}/conversation/${conversationId}`
        );
        setConversation({
          conversation: {
            name: response.data.conversation.name,
            picture: response.data.conversation.picture,
          },
          messages: response.data.messages,
        });
      } catch (error) {
        console.error("Error fetching conversation messages:", error);
      }
    }
  };
  useEffect(() => {
    fetchConversationMessages();
  }, [loggedId, conversationId, conversation]);
  return {
    conversation: conversation.conversation,
    messages: conversation.messages || [],
    loggedId: loggedId,
    conversationId: conversationId,
  };
};

export default useConversationPage;
