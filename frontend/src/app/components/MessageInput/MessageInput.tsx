import { useState } from "react";
import { FiSend } from "react-icons/fi"; // Pacote de ícones, você pode usar outros ícones conforme preferir
import { AiOutlinePaperClip } from "react-icons/ai"; // Para o ícone de anexo
import axiosAuthInstance from "../../../API/axiosAuthInstance";

const MessageInput: React.FC<MessageInputModel> = ({ onMessageSent, loggedId, conversationId }) => {
    const [message, setMessage] = useState("");
  
    const handleSendMessage = async () => {
      if (message.trim()) {
        try {
          // Envie a mensagem para a API
          await axiosAuthInstance
          .post(`/user/${loggedId}/conversation/${conversationId}`, 
            {
              conversationId,
              senderId: loggedId,
              content: message
            });
  
          // Chame a função de callback para atualizar o estado
          onMessageSent(message);
          setMessage(""); // Limpa a caixa de texto após o envio
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }
    };
  
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Impede a quebra de linha
        handleSendMessage();
      }
    };
  
    return (
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-2 flex items-center">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <AiOutlinePaperClip className="text-lg" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 ml-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="p-2 text-blue-500 hover:text-blue-700 ml-2"
        >
          <FiSend className="text-lg" />
        </button>
      </div>
    );
  };
  
  export default MessageInput;
