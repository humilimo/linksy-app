import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BsPeopleFill, BsCircle } from "react-icons/bs";
import {FriendProps} from "../FriendsList/FriendsListModel"
function AddParticipantToGroupModal(props) {
  const navigate = useNavigate();

  const [idList, setIdList] = useState<Number[]>([]);
  const [friendList, setFriendList] = useState<FriendProps[] | null>(null);

  const fetchFriendListData = async () => {
    await axios
      .get(
        `http://127.0.0.1:3002/user/${props.loggedId}/friend/all`
      )
      .then(response => {
        if (response.data.friendList){
          setFriendList(response.data.friendList.filter(friend => !props.participants.map(p => p.id).includes(friend.id)));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFriendListData();
  }, [props.loggedId, props.conversationId]);

  const handleCheckBox = async (id) =>{
    setIdList(idList.includes(id) ? idList.filter(i => i != id) : idList.concat(id));
  }

  const submitAddUsers = async () =>{
    await axios
      .post(
        `http://127.0.0.1:3002/user/${props.loggedId}/conversation/${props.conversationId}/adicionar`,
        {ids: idList}
      )
      .then(() => {
        if(props.path) {
          navigate(props.path);
        }
        else {
          window.location.reload();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
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
                  <input className="form-checkbox h-6 w-6 text-primary border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary" type="checkbox" onChange={() => handleCheckBox(friend.id)} />
                </li>
              ))}
            </ul>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
            onClick={() => {
                props.setShowAddUsersModal(false);
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
  );
};

export default AddParticipantToGroupModal;