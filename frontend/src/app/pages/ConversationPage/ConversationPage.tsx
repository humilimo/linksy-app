import { useState, useRef, useEffect } from "react";
import MessageBox from "../../components/MessageBox/MessageBox";
import ConversationMenuProfileComponent from "../../components/ConversationProfile/ConversationMenuProfileComponent";
import ConversationMenuComponent from "../../components/ConversationPage/ConversationMenuComponent";
import useConversationPage from "./ConversationPageController";
import MessageInput from "../../components/MessageInput/MessageInput";

const ConversationPage = () => {
  const {
    messages,
    loggedId,
    conversationId,
    showProfile,
    setShowProfile,
    messageContainerRef,
    updateMessageArray,
  } = useConversationPage({
    conversation: { name: "", picture: "" },
    messages: [],
  });

  return (
    <div className="flex flex-col h-screen">
      <ConversationMenuComponent
        loggedId={loggedId}
        conversationId={conversationId}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />
      <div className="bg-gray-100 flex flex-col flex-1">
        <div
          className={`flex flex-col ${showProfile ? "mr-[400px]" : ""} flex-1`}
        >
          <div
            ref={messageContainerRef}
            className="px-[30px] pt-[90px] overflow-y-auto scrollbar-hide"
            style={{ height: "calc(100vh - 61px)" }} // Adicione o estilo inline aqui
          >
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
                ? " right-0 border border-gray-300"
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
        onMessageSent={() => {
          updateMessageArray();
        }}
        loggedId={loggedId?.toString() || ""}
        conversationId={conversationId?.toString() || ""}
      />
    </div>
  );
};

export default ConversationPage;
