import { FiSend } from "react-icons/fi"; // Pacote de ícones, você pode usar outros ícones conforme preferir
import { AiOutlinePaperClip } from "react-icons/ai"; // Para o ícone de anexo
import useMessageInput from "./MessageInputController";

const MessageInput: React.FC<MessageInputModel> = ({
  onMessageSent,
  loggedId,
  conversationId,
}) => {
  const { message, setMessage, handleSendMessage, handleKeyDown } =
    useMessageInput({
      onMessageSent,
      loggedId,
      conversationId,
    });

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t z-20 border-gray-300 p-2 flex items-center">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 ml-2 border border-gray-300 focus:outline-none"
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
