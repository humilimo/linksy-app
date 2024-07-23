import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FriendListMultSelectComponent from "../FriendsList/FriendListMultSelectComponent"
import axiosAuthInstance from '../../../API/axiosAuthInstance';

function AddParticipantToGroupModal(props) {
  const navigate = useNavigate();

  const [idList, setIdList] = useState<Number[]>([]);

  
  const submitAddUsers = async () =>{
    await axiosAuthInstance
      .post(
        `/user/${props.loggedId}/conversation/${props.conversationId}/adicionar`,
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
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* HEADER */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Adicionar usuários
            </h3>
          </div>
          {/* BODY */}
          <FriendListMultSelectComponent loggedId={props.loggedId} idList={idList} setIdList={setIdList} participants={props.participants}/>
          {/* FOOTER */}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
            onClick={() => {
                props.setShowAddUsersModal(false);
                setIdList([]);
            }}>
              Cancelar
            </button>
            <button className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => submitAddUsers()} data-cy="confirm-add-participants-button">
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