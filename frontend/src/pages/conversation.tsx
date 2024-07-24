import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteMessageModal from '../components/DeleteMessageModal'; 
import Message from './Message'; 

const Conversation = () => {
  const [message, setMessage] = useState<MessageProps | null>(null);
  const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false);
  const [loggedId, setLoggedId] = useState<number>(0); 
  const [chatId, setChatId] = useState<number>(0); 
  const [messageId, setMessageId] = useState<number>(0); 
  const navigate = useNavigate();

  const handleDeleteMessage = (id: number) => {
    setMessageId(id);
    setShowDeleteMessageModal(true);
  }

  const showOptions = (id: number) => {
    setMessageId(id);
    setShowDeleteMessageModal(true);
  }

  return (
    <div>
      {/* Renderizar mensagen */}
      <Message id={1} text="Mensagem de exemplo" onDelete={handleDeleteMessage} showOptions={showOptions} />

      {showDeleteMessageModal && (
        <DeleteMessageModal
          message="Deseja apagar a mensagem?"
          setDeleteMessageModal={setShowDeleteMessageModal}
          loggedId={loggedId}
          conversationId={chatId}
          messageId={messageId}
        />
      )}
    </div>
  );
}

export default Conversation;
