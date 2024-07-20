import React from "react";
import MessageBox from "../../components/MessageBox/MessageBox";
import ConversationProfileMenu from "../ConversationProfile/index";
import useConversationPage from "./ConversationPageController";
import MessageInput from "../../components/MessageInput/MessageInput";

const ConversationPage: React.FC = () => {
  const { conversation, messages, loggedId, conversationId } = useConversationPage({ conversation: { name: '', picture: '' }, messages: [] });

  return (
    <div className="">
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
        <ConversationProfileMenu />
        <div className="mx-[15px] h-[800px] overflow-y-auto justify-center scrollbar-hide">
          {messages?.length > 0 ? (
            messages.map((msg, index) => (
              <MessageBox 
              key={index}
                message={msg.message}
                senderInfo={msg.senderInfo} 
                isOwnMessage={loggedId?.toString() === msg.message.senderId?.toString()} // Ajuste esta linha conforme necessário
              />
            ))
          ) : (
            <p>No messages found</p>
          )}
        </div>
        <MessageInput 
          onMessageSent={(message) => (console.log(message))}
          loggedId={loggedId?.toString() || ''} 
          conversationId={conversationId?.toString() || ''}
          />
      </div>
    </div>
  );
}

export default ConversationPage;
