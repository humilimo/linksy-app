import { useState, useEffect } from 'react';
import axiosAuthInstance from '../../../API/axiosAuthInstance';

function AddFriendModal(props) {

  const [username, setUsername] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [alreadyFriends, setAlreadyFriends] = useState(false);

  useEffect(() => {
    setAlreadyFriends(false);
  }, [username]);

  const addingFriend = async (e) =>{
    e.preventDefault();
    setNoResults(false);
    setAlreadyFriends(false);
      try {
        await axiosAuthInstance.post(`/user/${props.loggedId}/friend/add`,{ username: username },)
          .then(response => {
            if (response.data.receiverId){
                props.setShowAddFriendModal(false)
              }
            })
      }
      catch (error) {
          if (error?.response.status == 401) setNoResults(true)
          if (error?.response.status == 500) setAlreadyFriends(true)
          console.log(error);
      }
  }
  
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <form onSubmit={addingFriend} className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* HEADER */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Novo Amigo
            </h3>
          </div>
          {/* BODY */}
          <div className="relative p-6 flex flex-col justify-between">
            <div className='mx-4'>
              {noResults && <p className="text-red-500">Usuário inválido</p>}
              {alreadyFriends && <p className="text-red-500">{username?.toUpperCase()} já está na sua lista de amigos</p>} 
              <p className="text-lg"> Username: </p>
              <input 
              name='username' 
              id='username' 
              type="text" 
              className='rounded shadow border border-gray-200 px-1 py-2 w-full' 
              onChange={(e)=>{setUsername(e.target.value)}} 
              required data-cy={"friend-modal-friend-username-input"}/>
            </div>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button 
            className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="button" 
            onClick={() => {
              props.setShowAddFriendModal(false);
            }}>
              Cancelar
            </button>
            <button 
            className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="submit" 
            data-cy={"add-friend-modal-confirm-button"}>
              Adicionar
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
};

export default AddFriendModal;