import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu} from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";


const ConversationMenuComponent = ({
  loggedId,
  conversationId,
  showProfile,
  setShowProfile,
  searchTerm,
  loopSearch,
  noResults,
  error,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white border border-gray-300 fixed top-0 left-0 right-0 z-20">
      {/* Right side */}
      <button className='items-start' onClick={() => navigate(`/user/${loggedId}/conversation`)}>
        <BsArrowLeftShort className='text-4xl hover:text-gray-500 duration-150 '/>
      </button>
      <div className="flex items-center">
        <div className="relative flex items-center">
          {noResults && (
            <p className="text-red-500 margin mr-4">
              Mensagem não encontrada
            </p>
          )}
          <input
            type="text"
            placeholder="Pesquisar mensagem.."
            value={searchTerm}
            onChange={loopSearch}
            className="py-2 px-3 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 mr-4"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 mr-4" />
          {error && (
            <p className="text-red-500 absolute left-4 top-full mt-1">
              {error}
            </p>
          )}
        </div>
        <div className="hover:text-gray-700" data-cy={"conversation-profile-button"}>
          <div onClick={() => setShowProfile(!showProfile)} className="cursor-pointer">
            <AiOutlineMenu size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationMenuComponent;