import { useEffect, useState } from 'react';

import { BsPencilSquare } from "react-icons/bs";
import { FaUserCircle, FaUsers } from 'react-icons/fa';


import {ConversationProps, ParticipantProps, UserProps} from './ConversationProfileModel'

import AddParticipantToGroupModal from './AddParticipantToGroupModal'
import RemoveParticipantFromGroupModal from './RemoveParticipantFromGroupModal'
import LeaveConversationModal from './LeaveConversationModal'
import DeleteGroupModal from './DeleteGroupModal'
import EditGroupNameModal from './EditGroupNameModal'
import axiosAuthInstance from '../../../API/axiosAuthInstance';

const ConversationMenuProfileComponent = (props) => {
  const [owner, setOwner] = useState<boolean | null>(null);
  const [conversation, setConversation] = useState<ConversationProps | null>(null);
  const [participants, setParticipants] = useState<ParticipantProps[] | null>(null);
  
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const [showDeleteUsersModal, setShowDeleteUsersModal] = useState(false);
  const [deleteParticipant, setDeleteParticipant] = useState<ParticipantProps | null>(null);
  const [showLeaveConversationModal, setShowLeaveConversationModal] = useState(false);
  const [showEditGroupNameModal, setShowEditGroupNameModal] = useState(false);
  
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  
  const [user, setUser] = useState<UserProps | null>(null);

  const fetchConversationProfileData = async () => {
    await axiosAuthInstance
      .get(
        `/user/${props.loggedId}/conversation/${props.conversationId}/profile`
      )
      .then(response => {
        if (response.data.conversation){
          setOwner(response.data.owner);
          setConversation(response.data.conversation);
          setParticipants(response.data.participants);
        }
        else{
          setUser(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };


  useEffect(() => {
    fetchConversationProfileData();
  }, [props.loggedId, props.conversationId]);

  return (
    <>
    {/* GROUP CONVERSATION */}
      {(conversation && participants) ? (
        <div className='flex flex-col h-screen' data-cy={"conversation-profile-menu"}>
        {/* PICTURE AND NAME */}
          <div className='p-6 flex flex-col items-center'>
            {conversation.picture ? (
              <img src={conversation.picture} className="w-16 h-16 rounded-full" data-cy={"conversation-profile-group-picture"}/>
            ) : (
              <FaUsers data-cy={"conversation-profile-group-picture"} className="null text-gray-500 w-40 h-40"/>
            )}
            <div className='flex item-center justify-center text-2xl text-center font-bold py-6'>
              <p className="text-2xl text-center font-bold" data-cy={"conversation-profile-group-name"}>{conversation.name}</p>
              
              {owner ? (
                <button className='ml-4 hover:text-gray-500 text-[18px]' onClick={() => setShowEditGroupNameModal(true)} data-cy={"conversation-profile-group-name-edit-button"}>
                  <BsPencilSquare />
                </button>
              ) : null}
              {showEditGroupNameModal ? (
                  <EditGroupNameModal loggedId={props.loggedId} conversationId={props.conversationId} setShowEditGroupNameModal={setShowEditGroupNameModal}/>
              ) : null}
            </div>
          </div>
          
        {/* PARTICIPANTS TITLE AND ADD BUTTON */}
          <div className='ps-8 pb-2 flex justify-between items-center mb-1'>
            <h2 className="text-2xl font-semibold">Participantes</h2>
            {owner ? (
              <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowAddUsersModal(true)} data-cy={"conversation-profile-participants-add-button"}>
                Adicionar
              </button>
            ) : null}

            {showAddUsersModal ? (
              <AddParticipantToGroupModal loggedId={props.loggedId} conversationId={props.conversationId} setShowAddUsersModal={setShowAddUsersModal} participants={participants} path={null}/>
            ) : null}
          </div>
        {/* PARTICIPANTS LIST */}
          <div className='flex-1 bg-gray-100 mx-4 px-6 py-4 rounded-lg shadow-lg overflow-y-auto' data-cy={"conversation-profile-participants-list"}>
            <ul className="list-disc list-inside">
              {participants.map((participant, index) => (
                <li key={participant.id} className="text-gray-700 mb-2 flex items-center justify-between">
                  <div className='flex items-center'>
                    <div className='relative pe-4'>
                      {participant.picture ? (
                        <img src={participant.picture} alt={participant.name} className="w-10 h-10 rounded-full"/>
                      ) : (
                        <FaUserCircle className="text-gray-500 w-12 h-12"/>

                      )}
                    </div>
                    <p className='pe-4'>{participant.name}</p>
                    <p className='pe-4' data-cy={"conversation-profile-participant-"+participant.username}>({participant.username})</p>
                  </div>
                  {index == 0 ? (
                    <p className='justify-end pe-5 text-gray-500' data-cy={"conversation-profile-owner-"+participant.username}>Dono</p>
                  ) : owner ? (
                    <button className="justify-end text-center text-xs text-white py-1 px-2 rounded-xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150" type="button" onClick={() =>{setShowDeleteUsersModal(true); setDeleteParticipant(participant)}} data-cy={"conversation-profile-participant-"+participant.username+"-remove"}>
                      Remover
                    </button>
                  ) : null}
                  {showDeleteUsersModal && deleteParticipant == participant? (
                    <RemoveParticipantFromGroupModal loggedId={props.loggedId} conversationId={props.conversationId} setShowDeleteUsersModal={setShowDeleteUsersModal} deleteParticipant={deleteParticipant}/>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        {/* DELETE/LEAVE GRUOP BUTTON */}
          <div className='pb-[20px] pt-6 flex justify-end'>
            {owner ? (
              <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowDeleteGroupModal(true)} data-cy={"conversation-profile-delete-group-button"}>
                Deletar Grupo
              </button>
            ) : (
              <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowLeaveConversationModal(true)} data-cy={"conversation-profile-leave-group-button"}>
              Sair do Grupo
            </button>
            )}

            {showLeaveConversationModal ? (
              <LeaveConversationModal loggedId={props.loggedId} conversationId={props.conversationId} setShowLeaveConversationModal={setShowLeaveConversationModal} message={"Deseja sair do grupo?"}/>
            ) : null}

            {showDeleteGroupModal ? (
              <DeleteGroupModal loggedId={props.loggedId} conversationId={props.conversationId} setShowDeleteGroupModal={setShowDeleteGroupModal}/>
            ) : null}
          </div>
        </div>

    // SIMPLE CONVERSATION
      ) : user ? (
        <div className='flex flex-col h-screen'>
          <div className='p-6 flex flex-col items-center'>
            {user.picture ? (
              <img src={user.picture} className="w-16 h-16 rounded-full" data-cy={"conversation-profile-user-picture"}/>
            ) : (
              <FaUserCircle data-cy={"conversation-profile-user-picture"} className="null text-gray-500 w-40 h-40"/>

            )}
            <p className="text-2xl text-center font-bold pt-6" data-cy={"conversation-profile-user-name"}>{user.name}</p>
            <p className="text-md text-center font-bold pt-1" data-cy={"conversation-profile-user-username"}>({user.username})</p>
            <p className="text-md text-center pt-1" data-cy={"conversation-profile-user-email"}>{user.email}</p>
          </div>

          <div className='ps-8 pb-2'>
            <h2 className="text-2xl font-semibold">Bio:</h2>
          </div>

          <div className='flex-1 bg-gray-100 mx-4 px-6 py-4 rounded-lg shadow-lg overflow-y-auto'>
            <p className="text-gray-700" data-cy={"conversation-profile-user-bio"}>{user.bio}</p>
          </div>

          <div className='pb-[50px] pt-6 flex justify-end'>
            <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowLeaveConversationModal(true)} data-cy={"conversation-profile-delete-conversation-button"}>
              Excluir Conversa
            </button>
            {showLeaveConversationModal ? (
              <LeaveConversationModal message={"Deseja excluir a conversa?"} setShowLeaveConversationModal={setShowLeaveConversationModal} loggedId={props.loggedId} conversationId={props.conversationId}/>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="text-gray-700">No Conversation Found</p>
      )}
    </>
  );
};

export default ConversationMenuProfileComponent;