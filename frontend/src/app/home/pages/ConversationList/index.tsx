import {useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaUserCircle, FaUsers } from 'react-icons/fa';
import CreateSimpleConversationModal from '../../../../components/ConversationList/CreateSimpleConversationModal';
import CreateGroupModal from '../../../../components/ConversationList/CreateGroupModal';
import { ConversationProps } from '../../../../components/ConversationProfile/ConversationProfileModel';

function ConversationList() {
  const { loggedId } = useParams<{ loggedId: string }>();
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showCreateSimpleConversationModal, setShowCreateSimpleConversationModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    fetchConversations();
  }, [loggedId]);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3002/user/${loggedId}/conversation`);
      if (response.data) {
        setConversations(response.data);
      }
    } catch (error) {
      setError('Error fetching conversations');
      console.error(error);
    }
  };

  const toggleFavorite = async (conversationId: string) => {
    try {
      await axios.patch(`http://127.0.0.1:3002/user/${loggedId}/conversation/${conversationId}/favoritar`);
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

  return (
    <div className="p-6 pt-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-4xl font-bold">Conversation List</h1>
          <div className="flex space-x-4">
          <button
              className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowCreateSimpleConversationModal(true)}
              data-cy={"new-conversation-button"}

            >
              Nova Conversa
            </button>

            <button
              className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowCreateGroupModal(true)}
              data-cy={"new-group-button"}
            >
              Novo Grupo
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div
          className="conversation-list-container overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          {conversations.length > 0 ? (
            conversations.map(conversation => (
              <div
                className="conversation-item bg-gray-200 p-4 mb-4 rounded cursor-pointer flex justify-between items-center relative"
                data-cy={"conversation-list-id-"+conversation.id}
              >
                <Link
                  to={`/user/${loggedId}/conversation/${conversation.id}`}
                  className="conversation-link flex-1 flex items-center"
                >
                  {conversation.isGroup ? (
                    <FaUsers className="text-gray-500 mr-4 text-4xl" />
                  ) : (
                    <FaUserCircle className="text-gray-500 mr-4 text-4xl" />
                  )}
                  <div>
                    <div className='flex items-center'>
                      <h2 className="text-xl font-semibold" data-cy={"conversation-list-name-"+conversation.name}>{conversation.name}</h2>
                      {conversation.isGroup ? null : (
                        <h3 className='ml-4 text-gray-500' data-cy={"conversation-list-username-"+conversation.username}> {"("+conversation.username+")"} </h3>
                      )}
                    </div>
                    <p>{conversation.lastMessage}</p>
                  </div>
                </Link>
                <FaStar
                  className={`cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4 text-3xl ${conversation.favorited ? 'text-yellow-500' : 'text-gray-400'}`}
                  onClick={() => toggleFavorite(String(conversation.id))}
                />
              </div>
            ))
          ) : (
            <p>No conversations found.</p>
          )}
        </div>
      </div>

      {showCreateSimpleConversationModal && (
        <CreateSimpleConversationModal
          loggedId={loggedId}
          setShowCreateSimpleConversationModal={setShowCreateSimpleConversationModal}
        />
      )}

      {showCreateGroupModal && (
        <CreateGroupModal
          loggedId={loggedId}
          setShowCreateGroupModal={setShowCreateGroupModal}
        />
      )}
    </div>
  );
}

export default ConversationList;
