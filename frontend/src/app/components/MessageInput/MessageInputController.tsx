import axiosAuthInstance from "../../../API/axiosAuthInstance";
import { useState } from "react";

const useMessageInput = ({ onMessageSent, loggedId, conversationId }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        // Envie a mensagem para a API
        await axiosAuthInstance.post(
          `/user/${loggedId}/conversation/${conversationId}`,
          {
            conversationId,
            senderId: loggedId,
            content: message,
          }
        );

        // Chame a função de callback para atualizar o estado
        onMessageSent(message);
        setMessage(""); // Limpa a caixa de texto após o envio
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Impede a quebra de linha
      handleSendMessage();
    }
  };
  return {
    message,
    setMessage,
    handleSendMessage,
    handleKeyDown,
  };
};

export default useMessageInput;
