import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsPeopleFill, BsCircle } from "react-icons/bs";

import {ConversationProps, ParticipantProps, UserProps} from '../../../../components/ConversationProfile/ConversationProfileModel'

import AddParticipantToGroupModal from '../../../../components/ConversationProfile/AddParticipantToGroupModal'
import RemoveParticipantFromGroupModal from '../../../../components/ConversationProfile/RemoveParticipantFromGroupModal'
import LeaveConversationModal from '../../../../components/ConversationProfile/LeaveConversationModal'
import DeleteGroupModal from '../../../../components/ConversationProfile/DeleteGroupModal'

const ConversationProfileMenu = () => {
  const [nav, setNav] = useState(false);

  const { loggedId, conversationId } = useParams<{ loggedId: string; conversationId: string }>();
  
  const [owner, setOwner] = useState<boolean | null>(null);
  const [conversation, setConversation] = useState<ConversationProps | null>(null);
  const [participants, setParticipants] = useState<ParticipantProps[] | null>(null);
  
  const [friendList, setFriendList] = useState<UserProps[] | null>(null);
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const [showDeleteUsersModal, setShowDeleteUsersModal] = useState(false);
  const [deleteParticipant, setDeleteParticipant] = useState<ParticipantProps | null>(null);
  const [showLeaveConversationModal, setShowLeaveConversationModal] = useState(false);
  
  const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
  
  const [user, setUser] = useState<UserProps | null>(null);

  const fetchConversationProfileData = async () => {
    await axios
      .get(
        `http://127.0.0.1:3002/user/${loggedId}/conversation/${conversationId}/profile`
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

  const fetchFriendList = async () => {
    await axios
      .get(
        `http://127.0.0.1:3002/user/${loggedId}/friend/all`
      )
      .then(response => {
        if (response.data.friendList){
          setFriendList(response.data.friendList.filter(friend => !participants?.map(p => p.id).includes(friend.id)));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-end items-center p-4 bg-white border border-gray-300">
      {/* Right side */}
      <div className="flex items-center">
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
          <div className='flex flex-col h-screen'>
          {/* PICTURE AND NAME */}
            <div className='p-6 flex flex-col items-center'>
              {conversation.picture ? (
                <img src={conversation.picture} className="w-16 h-16 rounded-full"/>
              ) : (
                <div className="relative">
                  <BsCircle className="w-40 h-40"/>
                  <BsPeopleFill className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
              )}
              <p className="text-2xl text-center font-bold py-6">{conversation.name}</p>
            </div>
            
          {/* PARTICIPANTS TITLE AND ADD BUTTON */}
            <div className='ps-8 pb-2 flex justify-between items-center mb-1'>
              <h2 className="text-2xl font-semibold">Participantes</h2>
              {owner ? (
                <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => {setShowAddUsersModal(true); fetchFriendList()}}>
                  Adicionar
                </button>
              ) : null}

              {showAddUsersModal ? (
                <AddParticipantToGroupModal loggedId={loggedId} conversationId={conversationId} setShowAddUsersModal={setShowAddUsersModal}  friendList={friendList} path={null}/>
              ) : null}
            </div>
          {/* PARTICIPANTS LIST */}
            <div className='flex-1 bg-gray-100 mx-4 px-6 py-4 rounded-lg shadow-lg overflow-y-auto'>
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
                      <p className='pe-4'>({participant.username})</p>
                    </div>
                    {index == 0 ? (
                      <p className='justify-end pe-5 text-gray-500'>Dono</p>
                    ) : owner ? (
                      <button className="justify-end text-center text-xs text-white py-1 px-2 rounded-xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150" type="button" onClick={() =>{setShowDeleteUsersModal(true); setDeleteParticipant(participant)}}>
                        Remover
                      </button>
                    ) : null}
                    {showDeleteUsersModal ? (
                      <RemoveParticipantFromGroupModal loggedId={loggedId} conversationId={conversationId} setShowDeleteUsersModal={setShowDeleteUsersModal} deleteParticipant={deleteParticipant}/>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          {/* DELETE/LEAVE GRUOP BUTTON */}
            <div className='pb-[50px] pt-6 flex justify-end'>
              {owner ? (
                <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowDeleteGroupModal(true)}>
                  Deletar Grupo
                </button>
              ) : (
                <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowLeaveConversationModal(true)}>
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
                <img src={user.picture} className="w-16 h-16 rounded-full"/>
              ) : (
                <div className="relative">
                  <BsCircle className="w-40 h-40"/>
                  <BsPeopleFill className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
              )}
              <p className="text-2xl text-center font-bold pt-6">{user.name}</p>
              <p className="text-md text-center font-bold pt-1">({user.username})</p>
              <p className="text-md text-center pt-1">{user.email}</p>
            </div>

            <div className='ps-8 pb-2'>
              <h2 className="text-2xl font-semibold">Bio:</h2>
            </div>

            <div className='flex-1 bg-gray-100 mx-4 px-6 py-4 rounded-lg shadow-lg overflow-y-auto'>
              <p className="text-gray-700">{user.bio}</p>
            </div>

            <div className='pb-[50px] pt-6 flex justify-end'>
              <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowLeaveConversationModal(true)}>
                Excluir Conversa
              </button>
              {showLeaveConversationModal ? (
                <LeaveConversationModal message={"Deseja sair do grupo?"} setLeaveConversationModal={setShowLeaveConversationModal} loggedId={loggedId} conversationId={conversationId}/>
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