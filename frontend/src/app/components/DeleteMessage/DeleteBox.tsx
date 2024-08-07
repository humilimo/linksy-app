import React, { forwardRef, useState } from "react";
import { isToday } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FaUserCircle, FaTrash } from 'react-icons/fa';
import useMessageBox from "../hooks/useMessageBox";
import classNames from 'classnames';
import { MessageBoxModel } from "../types"; // Importando a interface
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ptBRLocale = ptBR as Locale;

const DeleteMessageBox = forwardRef<HTMLDivElement, MessageBoxModel>((
  {
    message,
    senderInfo,
    isOwnMessage,
    setMessageRef
  }, 
  ref
) => {
  const [showOptions, setShowOptions] = useState(false); // Estado para exibir o menu
  const [deleteOption, setDeleteOption] = useState<"none" | "self" | "all">("none"); // Estado para tipo de exclusão
  const navigate = useNavigate();

  const { messageDate, formattedTime, formattedDateTime } = useMessageBox({
    message,
    senderInfo,
    isOwnMessage,
  });

  const handleDeleteClick = () => {
    setShowOptions(!showOptions);
  };

  const handleDeleteOption = async (option: "forMe" | "forAll") => {
    setDeleteOption(option);
    setShowOptions(false);

    try {
      if (option === "forAll") {
        const response = await axios.delete(`http://127.0.0.1:3002/user/${senderInfo.id}/conversation/${message.conversationId}/deleteForAll/${message.id}`);
        if (response.data.destroyMessage) {
          navigate(`/user/${senderInfo.id}/conversation`, { state: { destroyMessage: response.data.destroyMessage } });
        }
      } else if (option === "forMe") {
        const response = await axios.post(`http://127.0.0.1:3002/user/${senderInfo.id}/conversation/${message.conversationId}/deleteForMe/${message.id}`);
        if (response.data.postMessage) {
          navigate(`/user/${senderInfo.id}/conversation`, { state: { postMessage: response.data.postMessage } });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={(el) => {
        if (ref) {
          (ref as React.RefObject<HTMLDivElement>).current = el;
        }
        if (setMessageRef) {
          setMessageRef(el);
        }
      }}
      className={classNames(
        "flex mb-4",
        {
          "justify-end": isOwnMessage,
          "justify-start": !isOwnMessage,
          "justify-center": message.senderId === "0",
        }
      )}
    >
      <div className="flex flex-col gap-1 min-w-40">
        <div
          className={classNames(
            "flex gap-2 items-end justify-center",
            {
              "flex-row-reverse": isOwnMessage,
              "flex-row": !isOwnMessage
            }
          )}
        >
          {message.senderId !== "0" && (
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
                {senderInfo.name}
              </p>
            </>
          )}
          <p
            className={classNames(
              "text-black text-[12px]",
              {
                "flex-grow": isOwnMessage && message.senderId !== "0",
                "": message.senderId === "0",
              }
            )}
          >
            {messageDate && isToday(messageDate) ? formattedTime : formattedDateTime}
          </p>
        </div>
        <div
          className={classNames(
            "max-w-xs p-3 rounded-lg relative",
            {
              "bg-blue-500 text-white": isOwnMessage,
              "bg-gray-200 text-black": !isOwnMessage,
            }
          )}
          data-cy={`message-${message.content}`}
        >
          <p className="text-sm break-words">{message.content}</p>
          {isOwnMessage && (
            <div className="absolute top-1 right-1">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleDeleteClick}
                aria-label="Deletar mensagem"
              >
                <FaTrash />
              </button>
              {showOptions && (
                <div className="absolute bg-white shadow-lg rounded mt-2 right-0 w-40 p-2">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleDeleteOption("forMe")}
                  >
                    Apagar para mim
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => handleDeleteOption("forAll")}
                  >
                    Apagar para todos
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default DeleteMessageBox;