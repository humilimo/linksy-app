import { FaUserCircle } from 'react-icons/fa';

function FriendInfoModal(props) {
  
  return (
    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* HEADER */}
          <div className="flex items-start justify-left p-5 border-b border-solid border-blueGray-200 rounded-t">
            {<FaUserCircle className="text-gray-500 mr-4 text-4xl" />}
            <h3 className="text-2xl font-semibold">
             {props.friendInfo.name}
            </h3>
          </div>
          {/* BODY */}
          <div className="relative p-6 flex flex-col justify-left">
            <div className='mx-4'>
              <p className="text-lg font-semibold">~{props.friendInfo.username}</p>
              <p className="text-lg"> {props.friendInfo.email} </p>
            </div>
          </div>
          {/* FOOTER */}
          <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button 
            className="bg-green-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="submit" 
            data-cy={"friend-info-modal"} 
            onClick={() => {props.setShowFriendInfoModal(false); }}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )

};

export default FriendInfoModal;