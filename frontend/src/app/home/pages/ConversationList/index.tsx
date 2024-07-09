import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import CreateSimpleConversationModal from "../../../../components/ConversationList/CreateSimpleConversationModal"


function ConversationList() {
  const location = useLocation();

  const { loggedId } = useParams<{ loggedId: string }>();

  const [showFriendListSelectionModal, setShowFriendListSelectionModal] = useState(false);

  return (
    <div className="p-6 pt-8 bg-gray-100 min-h-screen">
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className="flex items-center justify-center pb-8">
          <p className="ps-8 text-4xl font-bold">Conversation List</p>
          {(location.state && location.state.destroyMessage) ? (
            <p> {location.state.destroyMessage}</p>
          ) : null}
        </div>

        {/* NEW SIMPLE CONVERSATION BUTTON */}
        <div className='pb-[50px] pt-6 flex justify-end'>
          <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowFriendListSelectionModal(true)}>
            Nova Conversa
          </button>

          {showFriendListSelectionModal ? (
            <CreateSimpleConversationModal loggedId={loggedId} setShowFriendListSelectionModal={setShowFriendListSelectionModal}/>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ConversationList;