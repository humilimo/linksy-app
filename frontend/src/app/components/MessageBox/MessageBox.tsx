import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
const MessageBox: React.FC<MessageBoxModel> = ({ message, senderInfo, isOwnMessage }) => (
  <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
    <div className={`max-w-xs p-3 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} relative`}>
      {!isOwnMessage && (
        <p className="text-sm font-bold mb-1">{senderInfo.name}</p>
      )}
      <p className="text-sm">{message.content}</p>
      <p className="text-xs text-black mt-2">
        {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>
    </div>
    
  </div>
);

export default MessageBox;
