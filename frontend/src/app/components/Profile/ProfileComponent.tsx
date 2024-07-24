import { useEffect, useState } from 'react';

import { BsPencilSquare } from "react-icons/bs";
import { FaUserCircle } from 'react-icons/fa';


import {UserProps} from './ConversationProfileModel'
import axiosAuthInstance from '../../../API/axiosAuthInstance';
import EditNameModal from './EditNameModal';
import EditUsernameModal from './EditUsernameModal'; 
import EditBioModal from './EditBioModal';

const ConversationMenuProfileComponent = (props) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [showEditNameModal, setShowEditNameModal] = useState(false);
  const [showEditBioModal, setShowEditBioModal] = useState(false);
  const [showEditUsernameModal, setShowEditUsernameModal] = useState(false);
  const [userFlag, setUserFlag] = useState(false);

  const fetchConversationProfileData = async () => {
    await axiosAuthInstance
      .get(
        `/user/${props.loggedId}/profile`
      )
      .then(response => {
        setUser(response.data);
        setUserFlag(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchConversationProfileData();
  }, [props.loggedId, userFlag]);

  return (
    <>
    {/* GROUP CONVERSATION */}
    {(user) ? (
        <div className='flex flex-col h-full'>
            <div className='p-6 flex flex-col items-center'>
                <div className='flex flex-col items-center'>
                    {user.picture ? (
                    <img src={user.picture} className="w-16 h-16 rounded-full"/>
                    ) : (
                    <FaUserCircle className="null text-gray-500 w-40 h-40"/>
                    )}
                    <button 
                        className='mt-2 hover:text-gray-500 text-[18px]'
                        onClick={() => setShowEditNameModal(true)}
                        data-cy={"edit-picture-button"}>
                        <BsPencilSquare />
                    </button>
                </div>
                <div className='flex pt-6'>
                    <p 
                        className="text-2xl text-center font-bold"
                        data-cy={"profile-name"}>
                        {user.name}
                    </p>
                    <button
                        className='ml-4 hover:text-gray-500 text-[18px]'
                        onClick={() => setShowEditNameModal(true)}
                        data-cy={"edit-name-button"}>
                        <BsPencilSquare />
                    </button>
                    {showEditNameModal ? (
                        <EditNameModal setShowEditNameModal={setShowEditNameModal} loggedId={props.loggedId} setUserFlag={setUserFlag}/>
                    ) : null}
                </div>
                <div className='flex pt-2'>
                    <p className="text-md text-center font-bold">({user.username})</p>
                    <button
                        className='ml-4 hover:text-gray-500 text-[18px]'
                        onClick={() => setShowEditUsernameModal(true)}
                        data-cy={"edit-username-button"}>
                        <BsPencilSquare />
                    </button>
                    {showEditUsernameModal ? (
                        <EditUsernameModal setShowEditUsernameModal={setShowEditUsernameModal} loggedId={props.loggedId} setUserFlag={setUserFlag}/>
                    ) : null}
                </div>
            </div>
            
            <div className='ps-8 pb-2'>
                <div className='flex'>
                    <h2 className="text-2xl font-semibold">Bio:</h2>
                    <button
                        className='ml-4 hover:text-gray-500 text-[18px]'
                        onClick={() => setShowEditBioModal(true)}
                        data-cy={"edit-bio-button"}>
                        <BsPencilSquare />
                    </button>
                    {showEditBioModal ? (
                        <EditBioModal setShowEditBioModal={setShowEditBioModal} loggedId={props.loggedId} setUserFlag={setUserFlag}/>
                    ) : null}
                </div>
            </div>
            
            <div className='flex-1 bg-gray-200 mx-4 px-6 py-4 rounded-lg shadow-lg overflow-y-auto'>
                <p className="text-gray-700" >{user.bio}</p>
            </div>

            <div className='pt-6 flex justify-end'>
            <button 
                className="text-center text-white py-2 px-5 mr-8 rounded-2xl bg-red-600 hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button" 
                onClick={() => {localStorage.removeItem('token'); props.navigate(`/`)}}
                data-cy={"logout-button"}>
                Sair
            </button>
            {/* {showLeaveConversationModal ? (
                <LeaveConversationModal message={"Deseja excluir a conversa?"} setShowLeaveConversationModal={setShowLeaveConversationModal} loggedId={props.loggedId} conversationId={props.conversationId}/>
            ) : null} */}
            </div>
        </div>
    ) : (
        null
    )}
    </>
  );
};

export default ConversationMenuProfileComponent;