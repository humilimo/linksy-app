import { useEffect, useRef, useState } from "react";
import axiosAuthInstance from "../../../API/axiosAuthInstance";
import { useNavigate, useParams } from "react-router-dom";
import { MessageProps } from "../../components/SearchMessage/SearchMessageGlobalModel";
import { useLocation } from 'react-router-dom';
import { MessageBox } from "../../components/MessageBox/MessageBox";

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
  onDeleteForMe: (messageId: number) => void;
  onDeleteForAll: (messageId: number) => void;
}

interface ConversationPageModel {
  conversation: { name: string; picture: string };
  messages: MessageBoxModel[];
}

const useConversationPage = (model: ConversationPageModel) => {
  const [conversation, setConversation] = useState<ConversationPageModel>(model || { conversation: { name: "", picture: "" }, messages: [] });
  const { loggedId, conversationId } = useParams<{ loggedId: string; conversationId: string }>();
  console.log("loggedId:", loggedId, "conversationId:", conversationId);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<MessageProps[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const [useEffectFlag, setUseEffectFlag] = useState(0);
  const navigate = useNavigate();
  const [scrollFlag, setScrollFlag] = useState(false);
  const [messageId, setMessageId] = useState<number | null>(null);
  const messageRefs = useRef<Record<number, HTMLDivElement | null>>({});
  let location = useLocation();

  const fetchConversationMessages = async () => {
    if (loggedId && conversationId) {
      try {
        const response = await axiosAuthInstance.get<ConversationPageModel>(`/user/${loggedId}/conversation/${conversationId}`);
        setConversation({
          conversation: { name: response.data.conversation.name, picture: response.data.conversation.picture },
          messages: response.data.messages,
        });
      } catch (error) {
        console.error("Error fetching conversation messages:", error);
        navigate(`/`);
      }
    }
  };

  const searchMessages = async (targetWord: string) => {
    try {
      const response = await axiosAuthInstance.get(`/user/${loggedId}/conversation/${conversationId}/search`, {
        params: { targetWord },
      });

      if (response.data && response.data.length > 0) {
        setSearchedMessages(response.data);
        setNoResults(false);
      } else {
        setSearchedMessages([]);
        setNoResults(true);
      }
    } catch (error) {
      setError("Error searching messages");
      console.error(error);
    }
  };

  const loopSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setScrollFlag(false);
    if (value.trim() === '') {
      setSearchedMessages([]);
      setNoResults(false);
    } else {
      searchMessages(value);
    }
  };

  useEffect(() => {

    console.log(conversation);
    setTimeout(() => {//
      fetchConversationMessages();
    }, 1000);
    if (!useEffectFlag) {
      setTimeout(() => {
        scrollToBottom();
      }, 1100);
      setUseEffectFlag(1);
    }
  }, [conversation]);

  useEffect(() => {
    if (scrollFlag && messageId && messageRefs.current[messageId] && messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageRefs.current[messageId].getBoundingClientRect().top - messageContainerRef.current.getBoundingClientRect().top;
    }
  }, [scrollFlag]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
      if (location.state && location.state.messageId && location.state.scrollFlag) {
        setScrollFlag(true);
        setMessageId(location.state.messageId);
      }
    }
  };

  const updateMessageArray = () => {
    setUseEffectFlag(0);
  };

  const handleDeleteMessageForMe = (messageId: number) => {//new
    setConversation((prev) => ({
      ...prev,
      messages: prev.messages.filter((msg) => msg.message.id !== messageId),
    }));
  };

  const handleDeleteMessageForAll = async (messageId: number) => {//new
    if (!loggedId || !conversationId) {
      console.error("loggedId ou conversationId está indefinido.");
      return;
    }
  
    try {
      await axiosAuthInstance.delete(`/user/${loggedId}/conversation/${conversationId}/deleteForAll/${messageId}`);
      setConversation((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.message.id !== messageId),
      }));
    } catch (error) {
      console.error("Erro ao apagar a mensagem para todos:", error);
    }
  };
  

  return {
    conversation: conversation.conversation,
    messages: conversation.messages || [],
    loggedId: loggedId,
    conversationId: conversationId,
    noResults,
    loopSearch,
    searchTerm,
    error,
    searchMessages,
    searchedMessages,
    showProfile,
    setShowProfile,
    messageContainerRef,
    updateMessageArray,
    scrollToBottom,
    scrollFlag,
    messageRefs,
    setScrollFlag,
    setMessageId,
    handleDeleteMessageForMe,
    handleDeleteMessageForAll,
  };
};

export default useConversationPage;
