import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CgProfile } from "react-icons/cg";

const MessageBox: React.FC<MessageBoxModel> = ({ message, senderInfo, isOwnMessage }) => (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className='flex flex-col gap-1 min-w-40'>
        <div className="flex flex-row gap-2">
          {senderInfo.picture
            ? <img
                src={senderInfo.picture}
                alt={`${senderInfo.name}'s profile`}
                className="w-8 h-8 rounded-full"
              />
            : <CgProfile className="w-8 h-8 text-gray-500" />
          }
          <p className="text-xs text-black mt-2">
            {new Date(message.createdAt).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        <div className={`max-w-xs p-3 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} relative`}>
          {!isOwnMessage && (
            <p className="text-sm font-bold mb-1">{senderInfo.name}</p>
          )}
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
);

export default MessageBox;
