import { format, isToday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { CgProfile } from "react-icons/cg";

const MessageBox: React.FC<MessageBoxModel> = ({ message, senderInfo, isOwnMessage }) => (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className='flex flex-col gap-1 min-w-40'>
        <div className={`flex gap-2 items-end ${isOwnMessage ? 'flex-row-reverse':'flex-row'}`}>
          {senderInfo.picture
            ? <img
                src={senderInfo.picture}
                alt={`${senderInfo.name}'s profile`}
                className="w-8 h-8 rounded-full"
              />
            : <CgProfile className="w-8 h-8 text-gray-500" />
          }
          <p className={`font-bold ${isOwnMessage ? null : 'flex-grow'}`}>{senderInfo.name}</p>
          <p className={` text-black text-[12px] ${isOwnMessage ? 'flex-grow':null}`}>
            {
              new Date(message.createdAt).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })
            }
          </p>
        </div>
        <div className={`max-w-xs p-3 rounded-lg ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} relative`}>
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
);

export default MessageBox;
