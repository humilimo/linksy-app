import React, { forwardRef, useState } from "react";
import { isToday } from "date-fns";
import { FaUserCircle } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import classNames from "classnames";
import useMessageBox from "./MessageBoxController";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import useEffect from "react"
import axiosAuthInstance from '../../../API/axiosAuthInstance';

const MessageBox = forwardRef<HTMLDivElement, MessageBoxModel>((
  {
    message,
    senderInfo,
    isOwnMessage,
    setMessageRef,
    onDeleteForMe,
    onDeleteForAll,
    conversationId,
    loggedId,
    chatId,
    mensagemId
  }, 
  ref
) => {
  const { messageDate, formattedTime, formattedDateTime } = useMessageBox({
    message,
    senderInfo,
    isOwnMessage,
  });

  const navigate = useNavigate(); // Para navegar após a exclusão
  const isSenderSystem = message.senderId === "0";
  const [showDeleteOptions, setShowDeleteOptions] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteOptions(true);
    console.log(senderInfo);
    console.log(message);
  };

  const handleDeleteForMe = async () => {
    try {
      const response = await axiosAuthInstance.post(`/user/${loggedId}/conversation/${chatId}/deleteForMe/${mensagemId.message.id}`);
      console.log(response);
      // if (response.data.postMessage) {
        
      //   onDeleteForMe(message.id); // Chama a função do pai para atualizar o estado das mensagens
      //   console.log("Mensagem apagada para mim");
      // }
    } catch (error) {
      console.error("Erro ao apagar a mensagem para mim:", error);
    }

 
    setShowDeleteOptions(false);
  };

  const handleDeleteForAll = async (messageId: number) => {
    // if (!loggedId || !conversationId) {
    //   console.error("loggedId ou conversationId está indefinido.");
    //   console.error(senderInfo.id);
    //   console.error(conversationId);
    //   return;
    // }
    console.error(mensagemId);
    try {
      await axiosAuthInstance.delete(`/user/${loggedId}/conversation/${chatId}/deleteForAll/${mensagemId.message.id}`);
      // setConversation((prev) => ({
      //   ...prev,
      //   messages: prev.messages.filter((msg) => msg.message.id !== messageId),
      // }));
    } catch (error) {
      console.error("Erro ao apagar a mensagem para todos:", error);
    }
  };
  

  const handleCancelDelete = () => {
    setShowDeleteOptions(false);
  };

  return (
    <div
      ref={ref}
      className={classNames("flex mb-4 relative", {
        "justify-end": isOwnMessage,
        "justify-start": !isOwnMessage,
        "justify-center": isSenderSystem,
      })}
    >
      {showDeleteOptions && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-4 rounded-lg shadow-lg z-20">
            <p className="mb-4">Deseja apagar a mensagem?</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteForMe}>
              Apagar para mim
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDeleteForAll} data-cy= {`apagar`}>
              Apagar para todos
            </button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCancelDelete}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 min-w-40">
        <div
          className={classNames("flex gap-2 items-end", {
            "justify-center": isSenderSystem,
            "flex-row-reverse": isOwnMessage && !isSenderSystem,
            "flex-row": !isOwnMessage && !isSenderSystem,
          })}
        >
          {!isSenderSystem && (
            <>
              {senderInfo.picture ? (
                <img
                  src={senderInfo.picture}
                  alt={`${senderInfo.name}'s profile`}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-gray-500 w-8 h-8" />
              )}
              <p className={classNames("font-bold", { "flex-grow": !isOwnMessage })}>
                {senderInfo.name } 
              </p>
            </>
          )}
          <p
            className={classNames("text-black text-[12px]", {
              "flex-grow": isOwnMessage && !isSenderSystem,
            })}
          >
            {isToday(messageDate) ? formattedTime : formattedDateTime}
          </p>
          {isOwnMessage && (
            <button >
              
              <AiFillDelete
              onClick={handleDeleteClick} 
              className="ml-2 text-red-500" 
              data-cy = {`trash-icon-${message.content}-${message.id}`}
              
              />
            </button>
          )}
        </div>
        <div
          className={classNames("max-w-xs p-3 rounded-lg relative", {
            "bg-blue-500 text-white": isOwnMessage,
            "bg-gray-200 text-black": !isOwnMessage,
          })}
          data-cy={`message-${message.content}`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
});

export default MessageBox;
