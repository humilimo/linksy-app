import { useNavigate } from 'react-router-dom';

import { AiOutlineMenu} from "react-icons/ai";
import { BsArrowLeftShort } from "react-icons/bs";

const ConversationProfileMenuComponent = (props) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-white border border-gray-300 fixed top-0 left-0 right-0 z-20">
      {/* Right side */}
      <button className='items-start' onClick={() => navigate(`/user/${props.loggedId}/conversation`)}>
        <BsArrowLeftShort className='text-4xl hover:text-gray-500 duration-150 '/>
      </button>
      <div className="flex items-center" data-cy={"conversation-profile-button"}>
        <div onClick={() => props.setShowProfile(!props.showProfile)} className="cursor-pointer">
          <AiOutlineMenu size={30} />
        </div>
      </div>
    </div>
  );
};

export default ConversationProfileMenuComponent;