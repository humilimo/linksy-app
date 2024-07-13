import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {FriendProps} from '../FriendsList/FriendsListModel'
import { BsPeopleFill, BsCircle } from "react-icons/bs";

function CreateSimpleConversationModal(props) {
  const navigate = useNavigate();

  const [friendList, setFriendList] = useState<FriendProps[] | null>(null);

  const fetchFriendListData = async () => {
    await axios
      .get(`http://127.0.0.1:3002/user/${props.loggedId}/friend/all`)
      .then(response => {
        if (response.data.friendList){
          setFriendList(response.data.friendList);
        }
      })
      .catch(error => {
        console.log(error);
      })
  };

  useEffect(() => {
    fetchFriendListData();
  }, [props.loggedId]);

  const handleCreateSimpleConversation = async (id) =>{
    await axios
      .post(
        `http://127.0.0.1:3002/user/${props.loggedId}/conversation`, 
        {
          name: null,
          picture: null,
          isGroup: false,
          ids: [id]
        }
      )
      .then(response => {
        navigate(`/user/${props.loggedId}/conversation/${response.data.conversationId}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
        {/* HEADER */}
        <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 className="text-3xl font-semibold">
            Amigos
          </h3>
          <button className="justify-end p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => props.setShowCreateSimpleConversationModal(false)}>
            <span className="bg-transparent text-black h-6 w-6 text-4xl block outline-none focus:outline-none">
              ×
            </span>
          </button>
        </div>
        {/* BODY */}                  
        <div className='flex-1 bg-gray-100 mx-4 my-5 rounded-lg shadow-lg overflow-y-auto'>
          {friendList?.map((friend, index, array) => (
            <button className={"w-full border border-black hover:bg-gray-200" + (index == 0 ? (" rounded-t-lg") : array.length - 1 === index ? (" rounded-b-lg"): "")} onClick={() => handleCreateSimpleConversation(friend.id)} data-cy={"friend-list-button-"+friend.username}>
              <div className='flex items-center ml-2 m-2'>
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
                <p>({friend.username})</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )

};

export default CreateSimpleConversationModal;