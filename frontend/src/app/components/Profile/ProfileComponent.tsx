import { useEffect, useState } from 'react';

import { BsPencilSquare } from "react-icons/bs";
import { FaUserCircle, FaUsers } from 'react-icons/fa';


import {UserProps} from './ConversationProfileModel'
import EditGroupNameModal from './EditGroupNameModal'

import axiosAuthInstance from '../../../API/axiosAuthInstance';

const ConversationMenuProfileComponent = (props) => {
  const [showLeaveConversationModal, setShowLeaveConversationModal] = useState(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const [showEditGroupNameModal, setShowEditGroupNameModal] = useState(false);

  useEffect(() => {
    //fetchConversationProfileData();
  }, [props.loggedId, props.conversationId]);

  return (
    <>
    {/* GROUP CONVERSATION */}
    {(user) ? (
        <div className='flex flex-col h-screen'>
            <div className='p-6 flex flex-col items-center'>
                <div className='flex flex-col items-center'>
                    {user.picture ? (
                    <img src={user.picture} className="w-16 h-16 rounded-full"/>
                    ) : (
                    <FaUserCircle className="null text-gray-500 w-40 h-40"/>
                    )}
                    <button className='ml-4 hover:text-gray-500 text-[18px]' onClick={() => setShowEditGroupNameModal(true)}>
                        <BsPencilSquare />
                    </button>
                </div>
                <div className='flex item-center justify-center text-2xl text-center font-bold py-6'>
                    <p className="text-2xl text-center font-bold pt-6">{user.name}</p>
                    <button className='ml-4 hover:text-gray-500 text-[18px]' onClick={() => setShowEditGroupNameModal(true)} data-cy={"conversation-profile-group-name-edit-button"}>
                        <BsPencilSquare />
                    </button>
                </div>
                <div className='flex item-center justify-center text-2xl text-center font-bold py-6'>
                    <p className="text-md text-center font-bold pt-1">({user.username})</p>
                    <button className='ml-4 hover:text-gray-500 text-[18px]' onClick={() => setShowEditGroupNameModal(true)} data-cy={"conversation-profile-group-name-edit-button"}>
                        <BsPencilSquare />
                    </button>
                </div>
                <p className="text-md text-center pt-1">{user.email}</p>
            </div>
            
            <div className='ps-8 pb-2'>
                <div className='flex text-2xl font-bold py-6'>
                    <h2 className="text-2xl font-semibold">Bio:</h2>
                    <button className='ml-4 hover:text-gray-500 text-[18px]' onClick={() => setShowEditGroupNameModal(true)} data-cy={"conversation-profile-group-name-edit-button"}>
                        <BsPencilSquare />
                    </button>
                </div>
            </div>
            
            <div className='flex-1 bg-gray-100 mx-4 px-6 py-4 rounded-lg shadow-lg overflow-y-auto'>
            <p className="text-gray-700" >{user.bio}</p>
            </div>

            {/* <div className='pb-[50px] pt-6 flex justify-end'>
            <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowLeaveConversationModal(true)} data-cy={"conversation-profile-delete-conversation-button"}>
                Excluir Conversa
            </button>
            {showLeaveConversationModal ? (
                <LeaveConversationModal message={"Deseja excluir a conversa?"} setShowLeaveConversationModal={setShowLeaveConversationModal} loggedId={props.loggedId} conversationId={props.conversationId}/>
            ) : null}
            </div> */}
        </div>
    ) : (
        null
    )}
        
      
    </>
  );
};

export default ConversationMenuProfileComponent;