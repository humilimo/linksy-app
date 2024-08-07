import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaUserCircle, FaUsers, FaSearch} from 'react-icons/fa';
import { BsChatLeftFill } from "react-icons/bs";
import FriendListModal from '../../components/FriendsList/FriendListModal';
import ProfileComponent from '../../components/Profile/ProfileComponent';
import  useConversationList  from './ConversationListController'

function ConversationList() {
  const {
    loggedId,
    conversations,
    error,
    searchTerm,
    messages,
    noResults,
    fetchConversations,
    toggleFavorite,
    loopSearch,
    authenticated,
    navigate,
  } = useConversationList();

  const [showFriendListModal, setShowFriendListModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  };

  useEffect(() => {
    fetchConversations();
  }, [loggedId]);


  return (
    authenticated &&
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className={`bg-white p-6 rounded-lg shadow-lg h-[calc(100vh-3rem)]`}>
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-4xl font-bold">Linksy</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar Mensagem"
                value={searchTerm}
                onChange={loopSearch}
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
                data-cy="search-input-all-conversation"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {noResults && <p className="text-red-500 absolute left-4 top-full mt-1">Mensagem não encontrada</p>}
            </div>
            <button
              className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowFriendListModal(true)}
              data-cy={"new-conversation-button"}
            >
              <BsChatLeftFill/>
            </button>
 
            <div className="flex items-center justify-center">
            <div className=" cursor-pointer w-12 h-full bg-gray-600 hover:bg-gray-500 rounded-2xl flex items-center justify-center hover:shadow-lg focus:outline-none ease-linear transition-all duration-150">
              <FaUserCircle className="text-white text-3xl" onClick={() => handleShowProfile()}data-cy={"profile-button"}/>
            </div>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
          <div
            className={`duration-300 bg-white conversation-list-container overflow-y-auto h-[calc(100vh-180px)] ${showProfile ? "mr-[400px]" : ""}`}
          > 
            {messages.length > 0 ? (
              messages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => {
                    navigate(`/user/${loggedId}/conversation/${message.conversationId}`,{state: {scrollFlag:true,messageId: message.id}})
                  }}
                  className="conversation-item bg-gray-200 p-4 mb-4 rounded flex justify-between"
                  data-cy={"searched-message-all-conversation-"+message.content}
                >
                  <div className="flex items-center">
                    <FaUserCircle className="text-gray-500 mr-4 text-4xl" />
                    <div>
                      <div className="text-xl font-bold mb-2 text-black-600">
                        {message.conversationName}
                      </div>
                      <p>{message.content}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <h2 className="text-sm font-semibold">{message.senderName}</h2>
                    <p className="text-sm text-gray-500">{new Date(message.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              ))
            ) : (
              conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className="conversation-item bg-gray-200 p-4 mb-4 rounded cursor-pointer flex justify-between items-center relative"
                  data-cy={"conversation-list-id-"+conversation.id}
                >
                  <Link
                    to={`/user/${loggedId}/conversation/${conversation.id}`}
                    data-cy={`conversation-item-${conversation.id}`}
                    className="conversation-link flex-1 flex items-center"
                  >
                    {conversation.isGroup ? (
                      <FaUsers className="text-gray-500 mr-4 text-4xl" />
                    ) : (
                      <FaUserCircle className="text-gray-500 mr-4 text-4xl" />
                    )}
                    <div>
                      <div className='flex items-center'>
                      <h2 className="text-xl font-semibold" data-cy={"conversation-list-name-" + conversation.name}>{conversation.name}</h2>
                        {!conversation.isGroup && (
                          <h3 className='ml-2 text-gray-500' data-cy={"conversation-list-username-"+conversation.username}> {"("+conversation.username+")"}
                          </h3>
                        )}
                      </div>
                      <p>{conversation.lastMessage}</p>
                    </div>
                  </Link>
                  <div className="text-sm mr-12">
                    <h2 className="font-semibold">{conversation.lastMessageSenderName}</h2>
                    <p className="text-gray-500 ml-2">{new Date(conversation.lastMessageCreatedAt).toLocaleTimeString('pt-BR',{hour: '2-digit',minute: '2-digit',day: '2-digit', month: '2-digit'})}</p>
                  </div>
                  <FaStar
                    className={`cursor-pointer absolute top-[45%] transform -translate-y-1/2 right-4 text-3xl ${conversation.favorited ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => toggleFavorite(String(conversation.id))}
                    data-cy={`conversation-favorited-${conversation.id}`}
                  />
                </div>
              ))
            )}
          </div>
          <div
            className={
              "fixed flex flex-col top-[127px] h-[calc(100vh-180px)] w-[400px] bg-white z-10 duration-300" +
              (showProfile
                ? " right-[1.5rem]"
                : " right-[-100%]")
            }
          >
            <ProfileComponent
              loggedId={loggedId}
              navigate={navigate}
            />
          </div>
      </div>

      {showFriendListModal && (
        <FriendListModal
          loggedId={loggedId}
          setShowFriendListModal={setShowFriendListModal}
        />
      )}
    </div>
  );
}

export default ConversationList;
