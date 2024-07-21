import React from "react";
import { useState } from "react";
import MessageBox from "../../components/MessageBox/MessageBox";
import ConversationMenuProfileComponent from "../../components/ConversationProfile/ConversationMenuProfileComponent";
import ConversationMenuComponent from "../../components/ConversationPage/ConversationMenuComponent";
import useConversationPage from "./ConversationPageController";
import MessageInput from "../../components/MessageInput/MessageInput";

const ConversationPage = () => {
  const { conversation, messages, loggedId, conversationId } =
    useConversationPage({
      conversation: { name: "", picture: "" },
      messages: [],
    });
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex-col">
      <ConversationMenuComponent
        loggedId={loggedId}
        conversationId={conversationId}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />
      <div className="bg-gray-100 min-h-screen flex flex-col justify-center">
        <div className={`duration-300 ${showProfile ? "mr-[400px]" : ""}`}>
          <div className="px-[30px] h-[800px] overflow-y-auto justify-center scrollbar-hide">
            {messages?.length > 0
              ? messages.map((msg, index) => (
                  <MessageBox
                    key={index}
                    message={msg.message}
                    senderInfo={msg.senderInfo}
                    isOwnMessage={
                      loggedId?.toString() === msg.message.senderId?.toString()
                    } // Ajuste esta linha conforme necessário
                  />
                ))
              : null}
          </div>
          <div
            className={
              "fixed flex flex-col top-[69px] h-[calc(100%-127px)] w-[400px] bg-white z-10 duration-300" +
              (showProfile
                ? " right-0  border border-gray-300"
                : " right-[-100%]")
            }
          >
            <ConversationMenuProfileComponent
              loggedId={loggedId}
              conversationId={conversationId}
              setShowProfile={setShowProfile}
            />
          </div>
        </div>
      </div>
      <MessageInput
        onMessageSent={(message) => console.log(message)}
        loggedId={loggedId?.toString() || ""}
        conversationId={conversationId?.toString() || ""}
      />
    </div>
  );
};

export default ConversationPage;
