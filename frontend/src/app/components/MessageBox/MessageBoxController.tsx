import { format, isToday, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CgProfile } from "react-icons/cg";
const ptBRLocale = ptBR as unknown as Locale;

const useMessageBox = ({ message, senderInfo, isOwnMessage }) => {
  const messageDate = new Date(message.createdAt);
  const formattedTime = format(messageDate, "HH:mm", { locale: ptBRLocale });
  const formattedDateTime = format(messageDate, "dd/MM/yyyy HH:mm", {
    locale: ptBRLocale,
  });
  return {
    messageDate,
    formattedTime,
    formattedDateTime,
  };
};

export default useMessageBox;
