import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function DeleteGroupModal(props) {
  const navigate = useNavigate();

  const [groupName, setGroupName] = useState<string | null>(null);
  const [wrongGroupName, setWrongGroupName] = useState<boolean | false>(false);


  const submitGroupDeletion = async (e) =>{
    e.preventDefault();
    await axios
      .delete(
        `http://127.0.0.1:3002/user/${props.loggedId}/conversation/${props.conversationId}/delete_all`,
        {data: {groupName: groupName}}
      )
      .then(response => {
        if (response.data.destroyMessage){
          let path = `/user/${props.loggedId}/conversation`; 
          navigate(path, {state:{destroyMessage:response.data.destroyMessage}});
        }
        else if (response.data.wrongNameMessage){
          setWrongGroupName(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <form onSubmit={submitGroupDeletion} className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none" data-cy={"delete-group-modal"}>
          {/* HEADER */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
              Deseja deletar o grupo?
            </h3>
          </div>
          {/* BODY */}
          <div className="relative p-6 flex-auto">
            <p className="mb-1 text-blueGray-500 text-lg leading-relaxed text-center">
              Para confirmar a deleção do grupo, escreva abaixo <br /> o nome do grupo e clique em 'Deletar' 
            </p>
            { wrongGroupName ? (
              <p className='text-red-500' data-cy={"delete-group-modal-wrong-group-name"}>
                Nome do Grupo Incorreto
              </p>
            ) : null}
            
            <input name='groupName' id='groupName' onChange={(e)=>{setGroupName(e.target.value)}} type="text" className='rounded shadow border border-gray-200 px-1 py-2 mt-3 w-full' data-cy={"delete-group-modal-group-name-input"}/>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" 
            onClick={() => {
              props.setShowDeleteGroupModal(false); 
              setWrongGroupName(false);
            }}>
              Cancelar
            </button>
            <button className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="submit" data-cy={"delete-group-modal-confirm-button"}>
              Deletar
            </button>
          </div>
        </div>
      </form>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
  )

};

export default DeleteGroupModal;