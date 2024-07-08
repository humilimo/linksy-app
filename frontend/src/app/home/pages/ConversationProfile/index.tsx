import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {ConversationProfileProps, UserProps} from '../../../../components/ConversationProfile/ConversationProfileModel'
import { BsPeopleFill, BsCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


const ConversationProfileMenu = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const { loggedId, conversationId } = useParams<{ loggedId: string; conversationId: string }>();
  
  const [owner, setOwner] = useState<ConversationProfileProps["owner"] | null>(null);
  const [conversation, setConversation] = useState<ConversationProfileProps["conversation"] | null>(null);
  const [participants, setParticipants] = useState<ConversationProfileProps["participants"] | null>(null);
  
  const [user, setUser] = useState<UserProps | null>(null);
  const [friendList, setFriendList] = useState<UserProps[] | null>(null);
  const [showAddUsersModal, setShowAddUsersModal] = useState(false);
  const [idList, setIdList] = useState<Number[]>([]);

  const [showDeleteGroupModal, setShowDeleteGroupModal] = React.useState(false);
  const [groupName, setGroupName] = React.useState<string | null>(null);
  const [wrongGroupName, setWrongGroupName] = React.useState<boolean | false>(false);

  const fetchConversationProfileData = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3002/user/${loggedId}/conversation/${conversationId}/profile`
      );
      if (response.data.conversation){
        setOwner(response.data.owner);
        setConversation(response.data.conversation);
        setParticipants(response.data.participants);
      }
      else{
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFriendList = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3002/user/${loggedId}/friend/all`
      );
      if (response.data.friendList){
        setFriendList(response.data.friendList.filter(friend => !participants?.map(p => p.id).includes(friend.id)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversationProfileData();
  }, [loggedId, conversationId]);

  const submitGroupDeletion = async (e) =>{
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3002/user/${loggedId}/conversation/${conversationId}/delete_all`, {data: {groupName: groupName}}
      );
      if (response.data.destroyMessage){
        let path = `/user/${loggedId}/conversation`; 
        navigate(path, {state:{destroyMessage:response.data.destroyMessage}});
      }
      else if (response.data.wrongNameMessage){
        setWrongGroupName(true);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const submitAddUsers = async () =>{
    try {
      const response = await axios.post(
        `http://127.0.0.1:3002/user/${loggedId}/conversation/${conversationId}/adicionar`, {ids: idList}
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const handleCheckBox = async (id) =>{
    setIdList(idList.includes(id) ? idList.filter(i => i != id) : idList.concat(id));
  }

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

        {(conversation && participants) ? (
          <div className='flex flex-col h-screen'>
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
            
            <div className='ps-8 pb-2 flex justify-between items-center mb-1'>
              <h2 className="text-2xl font-semibold">Participantes</h2>
              {owner ? (
                <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => {setShowAddUsersModal(true); fetchFriendList()}}>
                  Adicionar
                </button>
              ) : null}

              {showAddUsersModal ? (
                <>
                <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none h-full">
                  <div className="relative w-auto my-6 mx-auto max-w-3xl h-[calc(100%-1rem)]">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-[100%]">
                      {/* HEADER */}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Adicionar usuários
                        </h3>
                      </div>
                      {/* BODY */}
                      <div className="relative p-6 overflow-y-auto">
                        <ul className='lista'>
                          {friendList?.map(friend => (
                            <li key={friend.id} className="text-black mb-2 flex items-center justify-between">
                              <div className='flex items-center'>
                                <div className='relative pe-4'>
                                  {friend.picture ? (
                                    <img src={friend.picture} alt={friend.name} className="w-10 h-10 rounded-full"/>
                                  ) : (
                                    <div className='relative'>
                                      <BsCircle className="w-12 h-12"/>
                                      <BsPeopleFill className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                                    </div>
                                  )}
                                </div>
                                <p className='pe-4'>{friend.name}</p>
                                <p className='pe-4'>({friend.username})</p>
                              </div>
                              <input
                                type="checkbox"
                                onChange={() => handleCheckBox(friend.id)}
                                className="form-checkbox h-6 w-6 text-primary border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* FOOTER */}
                      <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
                        onClick={() => {
                          setShowAddUsersModal(false);
                          setIdList([]);
                        }}>
                          Cancelar
                        </button>
                        <button className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => submitAddUsers()}>
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
              ) : null}
            </div>

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
                      <button className="justify-end text-center text-xs text-white py-1 px-2 rounded-xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150" type="button">
                        Remover
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className='pb-[50px] pt-6 flex justify-end'>
              {owner ? (
                <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" onClick={() => setShowDeleteGroupModal(true)}>
                  Deletar Grupo
                </button>
              ) : (
                <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button">
                Sair do Grupo
              </button>
              )}

              {showDeleteGroupModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <form onSubmit={submitGroupDeletion} className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/* HEADER */}
                      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                          Deseja deletar o grupo?
                        </h3>
                        <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowDeleteGroupModal(false)}>
                          <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/* BODY */}
                      <div className="relative p-6 flex-auto">
                        <p className="mb-1 text-blueGray-500 text-lg leading-relaxed text-center">
                          Para confirmar a deleção do grupo, escreva abaixo <br /> o nome do grupo e clique em 'Deletar' 
                        </p>
                        { wrongGroupName ? (
                          <p className='text-red-500'>
                            Nome do Grupo Incorreto
                          </p>
                        ) : null}
                        
                        <input name='groupName' id='groupName' onChange={(e)=>{setGroupName(e.target.value)}} type="text" className='rounded shadow border border-gray-200 px-1 py-2 mt-3 w-full' />
                      </div>
                      {/* FOOTER */}
                      <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
                        onClick={() => {
                          setShowDeleteGroupModal(false); 
                          setWrongGroupName(false);
                        }}>
                          Cancelar
                        </button>
                        <button className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit">
                          Deletar
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
              </>
              ) : null}
            </div>
          </div>
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
              <button className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150" type="button" >
                Excluir Conversa
              </button>
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