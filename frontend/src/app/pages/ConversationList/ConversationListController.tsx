import { useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { ConversationProps } from '../../components/ConversationProfile/ConversationProfileModel';
import { MessageProps } from '../../components/SearchMessage/SearchMessageGlobalModel';
import axiosAuthInstance from '../../../API/axiosAuthInstance';

const useConversationList = () => {
  const { loggedId } = useParams<{ loggedId: string }>();
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate()
  const [scrollFlag, setScrollFlag] = useState(false);
  const [messageId, setMessageId] = useState<number | null>(null);

  const fetchConversations = async () => {
    try {
      const response = await axiosAuthInstance.get(`/user/${loggedId}/conversation`);
      if (response.data) {
        setConversations(response.data);
        setAuthenticated(true)
      }
    } catch (error) {
      setError('Error fetching conversations');
      console.error(error);
      navigate(`/`)
    }
  };

  const searchMessages = async (targetWord: string) => {
    try {
      const response = await axiosAuthInstance.get(`/user/${loggedId}/conversation/search`, {
        params: { targetWord },
      });
     
      if (response.data && response.data.length > 0) {
        setMessages(response.data);
        setNoResults(false);
      }
      else{
        setMessages([]);
        setNoResults(true); 
      }
    } catch (error) {
      setError('Error searching messages');
      console.error(error);
    }
  };

  const loopSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setMessages([]);
      setNoResults(false);
    } else {
      searchMessages(value);
    }
  };

  const toggleFavorite = async (conversationId: string) => {
    try {
      await axiosAuthInstance.patch(`/user/${loggedId}/conversation/${conversationId}/favoritar`);
      setConversations(prevConversations =>
        prevConversations.map(conversation =>
          conversation.id === Number(conversationId)
            ? { ...conversation, favorited: !conversation.favorited }
            : conversation
        )
      );
      fetchConversations();
    } catch (error) {
      setError('Error toggling favorite');
      console.error('Error toggling favorite:', error);
    }
  };

  return{
    loggedId,
    conversations,
    error,
    searchTerm,
    messages,
    noResults,
    authenticated,
    fetchConversations,
    searchMessages,
    toggleFavorite,
    loopSearch,
    navigate,
    scrollFlag,
    setScrollFlag,
    messageId,
    setMessageId,
  };

};

export default useConversationList;