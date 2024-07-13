import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FriendListMultSelectComponent from "../FriendsList/FriendListMultSelectComponent"
function CreateGroupModal(props) {
  const navigate = useNavigate();

  const [idList, setIdList] = useState<Number[]>([]);
  const [groupName, setGroupName] = useState<string | null>(null);


  const submitGroupCreation = async (e) =>{
    e.preventDefault();
    await axios
      .post(
        `http://127.0.0.1:3002/user/${props.loggedId}/conversation`,
        {
          isGroup: true,
          name: groupName,
          ids: idList,
          picture: null
        }
      )
      .then(response => {
        if (response.data.conversationId){
          navigate(`/user/${props.loggedId}/conversation/${response.data.conversationId}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <form onSubmit={submitGroupCreation} className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* HEADER */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Novo Grupo
            </h3>
          </div>
          {/* BODY */}
          <div className="relative p-6 flex flex-col justify-between">
            <div className='mx-4'>
              <p className="text-lg"> Nome: </p>
              <input name='groupName' id='groupName' type="text" className='rounded shadow border border-gray-200 px-1 py-2 w-full' onChange={(e)=>{setGroupName(e.target.value)}} required data-cy={"group-modal-group-name-input"}/>
            </div>
            <div className='pt-6'>
              <p className="text-lg mx-4"> Participantes: </p>
              <div className='bg-gray-100 mx-4 px-6 rounded-lg shadow-lg overflow-y-auto max-h-[350px]'>
                <FriendListMultSelectComponent loggedId={props.loggedId} idList={idList} setIdList={setIdList}/>
              </div>
            </div>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
            onClick={() => {
              props.setShowCreateGroupModal(false);
            }}>
              Cancelar
            </button>
            <button className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" data-cy={"craete-group-modal-confirm-button"}>
              Criar
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )

};

export default CreateGroupModal;