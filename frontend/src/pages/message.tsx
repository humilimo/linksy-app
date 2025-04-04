import React from 'react';

interface MessageProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
  showOptions: (id: number) => void;
}

const Message: React.FC<MessageProps> = ({ id, text, onDelete, showOptions }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <p>{text}</p>
      <button onClick={() => showOptions(id)}>Opções</button>
    </div>
  );
};

export default Message;
