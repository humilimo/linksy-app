import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsPeopleFill, BsCircle, BsPencilSquare } from "react-icons/bs";

import {ConversationProps, ParticipantProps, UserProps} from '../../../../components/ConversationProfile/ConversationProfileModel'

import AddParticipantToGroupModal from '../../../../components/ConversationProfile/AddParticipantToGroupModal'
import RemoveParticipantFromGroupModal from '../../../../components/ConversationProfile/RemoveParticipantFromGroupModal'
import LeaveConversationModal from '../../../../components/ConversationProfile/LeaveConversationModal'
import DeleteGroupModal from '../../../../components/ConversationProfile/DeleteGroupModal'
import EditGroupNameModal from '../../../../components/ConversationProfile/EditGroupNameModal'
import axiosAuthInstance from '../../../../API/axiosAuthInstance';

const ConversationProfileMenu = () => {
  const [nav, setNav] = useState(false);

  const { loggedId, conversationId } = useParams<{ loggedId: string; conversationId: string }>();
  
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
        `/user/${loggedId}/conversation/${conversationId}/profile`
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
  }, [loggedId, conversationId]);

  return (
    <div className="flex justify-end items-center p-4 bg-white border border-gray-300">
      {/* Right side */}
      <div className="flex items-center" data-cy={"conversation-profile-button"}>
        <div onClick={() => setNav(!nav)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
      </div>

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 right-0 w-[400px] h-screen bg-white z-10 duration-300 border border-gray-300"
            : "fixed top-0 right-[-100%] w-[400px] h-screen bg-white z-10 duration-300"
        }
      >
        <div className="p-4">
          <AiOutlineClose
            onClick={() => setNav(!nav)}
            size={30}
            className="absolute right-4 top-4 cursor-pointer"
          />
        </div>
      {/* GROUP CONVERSATION */}
        {(conversation && participants) ? (
          <div className='flex flex-col h-screen' data-cy={"conversation-profile-menu"}>
          {/* PICTURE AND NAME */}
            <div className='p-6 flex flex-col items-center'>
              {conversation.picture ? (
                <img src={conversation.picture} className="w-16 h-16 rounded-full" data-cy={"conversation-profile-group-picture"}/>
              ) : (
                <div className="relative null" data-cy={"conversation-profile-group-picture"}>
                  <BsCircle className="w-40 h-40"/>
                  <BsPeopleFill className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
              )}
              <div className='flex item-center justify-center text-2xl text-center font-bold py-6'>
                <p className="text-2xl text-center font-bold" data-cy={"conversation-profile-group-name"}>{conversation.name}</p>
                
                {owner ? (
                  <button className='ml-4 hover:text-gray-500 text-[18px]' onClick={() => setShowEditGroupNameModal(true)} data-cy={"conversation-profile-group-name-edit-button"}>
                    <BsPencilSquare />
                  </button>
                ) : null}
                {showEditGroupNameModal ? (
                    <EditGroupNameModal loggedId={loggedId} conversationId={conversationId} setShowEditGroupNameModal={setShowEditGroupNameModal}/>
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
                <AddParticipantToGroupModal loggedId={loggedId} conversationId={conversationId} setShowAddUsersModal={setShowAddUsersModal} participants={participants} path={null}/>
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
                          <div className='relative'>
                            <BsCircle className="w-12 h-12"/>
                            <BsPeopleFill className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                          </div>
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
                      <RemoveParticipantFromGroupModal loggedId={loggedId} conversationId={conversationId} setShowDeleteUsersModal={setShowDeleteUsersModal} deleteParticipant={deleteParticipant}/>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          {/* DELETE/LEAVE GRUOP BUTTON */}
            <div className='pb-[50px] pt-6 flex justify-end'>
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
                <LeaveConversationModal loggedId={loggedId} conversationId={conversationId} setShowLeaveConversationModal={setShowLeaveConversationModal} message={"Deseja sair do grupo?"}/>
              ) : null}

              {showDeleteGroupModal ? (
                <DeleteGroupModal loggedId={loggedId} conversationId={conversationId} setShowDeleteGroupModal={setShowDeleteGroupModal}/>
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
                <div className="relative null" data-cy={"conversation-profile-user-picture"}>
                  <BsCircle className="w-40 h-40"/>
                  <BsPeopleFill className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
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
                <LeaveConversationModal message={"Deseja excluir a conversa?"} setShowLeaveConversationModal={setShowLeaveConversationModal} loggedId={loggedId} conversationId={conversationId}/>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-gray-700">No Conversation Found</p>
        )}
      </div>
    </div>
  );
};

export default ConversationProfileMenu;