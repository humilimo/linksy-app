import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {ConversationProfileProps, UserProps} from '../../../../components/ConversationProfile/ConversationProfileModel'
import { BsPeopleFill, BsCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function ConversationProfile() {
  const navigate = useNavigate();

  const { loggedId, conversationId } = useParams<{ loggedId: string; conversationId: string }>();
  
  const [owner, setOwner] = useState<ConversationProfileProps["owner"] | null>(null);
  const [conversation, setConversation] = useState<ConversationProfileProps["conversation"] | null>(null);
  const [participants, setParticipants] = useState<ConversationProfileProps["participants"] | null>(null);
  
  const [user, setUser] = useState<UserProps | null>(null);

  const [showDeleteGroupModal, setShowDeleteGroupModal] = React.useState(false);

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

  useEffect(() => {
    fetchConversationProfileData();
  }, [loggedId, conversationId]);

  const handleGroupDeletion = async () =>{ 
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3002/user/${loggedId}/conversation/${conversationId}/delete_all`
      );
      if (response.data.destroyMessage){
        let path = `/user/${loggedId}/conversation`; 
        navigate(path, {state:{destroyMessage:response.data.destroyMessage}});
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="p-6 pt-8 bg-gray-100 min-h-screen">
      {(conversation && participants) ? (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <div className="flex items-center justify-center pb-8">
            {conversation.picture ? (
              <img src={conversation.picture} className="w-16 h-16 rounded-full"/>
            ) : (
              <div className="relative">
                <BsCircle className="w-40 h-40"/>
                <BsPeopleFill className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
              </div>
            )}
            <p className="ps-8 text-4xl font-bold">{conversation.name}</p>
          </div>

          <div className='bg-gray-100 p-6 rounded-lg shadow-lg'>
            <h2 className="text-2xl font-semibold mt-4 mb-2">Participants</h2>
            <ul className="list-disc list-inside">
              {participants.map((participant) => (
                <li key={participant.id} className="text-gray-700 mb-2 flex items-center">
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
                </li>
              ))}
            </ul>
          </div>
          
          <div className='flex justify-end pt-8'>
            {owner ? (
              <button className="text-center text-white py-2 px-5 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowDeleteGroupModal(true)}>
                DELETAR GRUPO
              </button>
            ):(null)}

            {showDeleteGroupModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">
                        Confirmar deleção do grupo
                      </h3>
                      <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowDeleteGroupModal(false)}>
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                        Certeza que deseja deletar o grupo?
                      </p>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowDeleteGroupModal(false)}>
                        Cancelar
                      </button>
                      <button className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={handleGroupDeletion} >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            ) : null}
          </div>

        </div>
      ) : user ? (
        <div className="p-6 pt-8 bg-gray-100 min-h-screen">
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className="flex items-center justify-center pb-8">
              {user.picture ? (
                <img src={user.picture} className="w-16 h-16 rounded-full"/>
              ) : (
                <div className="relative">
                  <BsCircle className="w-28 h-28"/>
                  <BsPeopleFill className="w-20 h-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                </div>
              )}
              <p className="ps-8 text-4xl font-bold">{user.name} ({user.username})</p>
            </div>

            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Bio: {user.bio}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">No Conversation Found</p>
      )}
    </div>
  );

  
}

export default ConversationProfile;