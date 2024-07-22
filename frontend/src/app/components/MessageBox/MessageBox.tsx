import { format, isToday, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FaUserCircle } from 'react-icons/fa';
import useMessageBox from "./MessageBoxController";
const ptBRLocale = ptBR as unknown as Locale;

const MessageBox: React.FC<MessageBoxModel> = ({
  message,
  senderInfo,
  isOwnMessage,
}) => {
  const { messageDate, formattedTime, formattedDateTime } = useMessageBox({
    message,
    senderInfo,
    isOwnMessage,
  });
  return (
    <div
      className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"} ${
        message.senderId == "0" ? "justify-center" : null
      }`}
    >
      <div className="flex flex-col gap-1 min-w-40">
        <div
          className={`flex gap-2 items-end justify-center ${
            isOwnMessage ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {message.senderId != "0" && (
            <>
              {senderInfo.picture ? (
                <img
                  src={senderInfo.picture}
                  alt={`${senderInfo.name}'s profile`}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <FaUserCircle className="text-gray-500 w-8 h-8"/>
              )}
              <p className={`font-bold ${isOwnMessage ? "" : "flex-grow"}`}>
                {senderInfo.name}
              </p>
            </>
          )}
          <p
            className={` text-black text-[12px] ${
              isOwnMessage && message.senderId != "0" ? "flex-grow" : null
            } ${message.senderId == "0" ? "" : null}`}
          >
            {isToday(messageDate) ? formattedTime : formattedDateTime}
          </p>
        </div>
        <div
          className={`max-w-xs p-3 rounded-lg ${
            isOwnMessage ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
          } relative`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
