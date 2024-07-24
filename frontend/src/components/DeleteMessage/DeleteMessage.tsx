import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function DeleteMessageModal(props) {
  const navigate = useNavigate();
  const [forMe, setForMe] = useState(false);
  const [forAll, setForAll] = useState(false);

  const submitDeleteMessage = async (e) => {
    e.preventDefault();

    try {
      if (forAll && !forMe) {
        const response = await axios.delete(`http://127.0.0.1:3002/user/${props.loggedId}/conversation/${props.conversationId}/deleteForAll/${props.messageId}`);
        if (response.data.destroyMessage) {
          navigate(`/user/${props.loggedId}/conversation`, { state: { destroyMessage: response.data.destroyMessage } });
        }
      } else if (forMe && !forAll) {
        const response = await axios.post(`http://127.0.0.1:3002/user/${props.loggedId}/conversation/${props.conversationId}/deleteForMe/${props.messageId}`);
        if (response.data.postMessage) {
          navigate(`/user/${props.loggedId}/conversation`, { state: { postMessage: response.data.postMessage } });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <form onSubmit={submitDeleteMessage} className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* HEADER */}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Deseja deletar a mensagem?
              </h3>
            </div>
            {/* FOOTER */}
            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setForMe(false);
                  setForAll(true);
                }}
              >
                Apagar para todos
              </button>
              <button
                className="bg-gray-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-gray-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  setForMe(true);
                  setForAll(false);
                }}
              >
                Apagar para mim apenas
              </button>
              <button
                className="bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-red-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
              >
                Deletar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default DeleteMessageModal;
