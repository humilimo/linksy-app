import { useNavigate } from "react-router-dom";
import axiosAuthInstance from '../../API/axiosAuthInstance';

function LeaveConversationModal(props) {
  const navigate = useNavigate();

  const submitLeaveConversation = async () =>{
    await axiosAuthInstance
      .patch(
        `/user/${props.loggedId}/conversation/${props.conversationId}/sair`
      )
      .then(() => {
        navigate(`/user/${props.loggedId}/conversation`);
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
              {props.message}
            </h3>
          </div>
          {/* BODY */}
            
          {/* FOOTER */}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => props.setShowLeaveConversationModal(false)}>
              Cancelar
            </button>
            <button className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => submitLeaveConversation()} data-cy="confirm-leave-conversation-button">
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default LeaveConversationModal;