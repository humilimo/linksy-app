import { useEffect, useState } from 'react';
import { FaUserCircle, FaSearch, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import CreateGroupModal from '../../components/ConversationList/CreateGroupModal';
import AddFriendModal from '../../components/FriendsList/AddFriendModal';
import { FriendProps } from '../../components/FriendsList/FriendsListModel';
import axiosAuthInstance from '../../../API/axiosAuthInstance';

function FriendListModal(props) {
  const [friendList, setFriendList] = useState<FriendProps[]>([]);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, [props.loggedId]);

  const fetchFriends = async () => {
    try {
      const response = await axiosAuthInstance.get(`/user/${props.loggedId}/friend/all`);
      if (response) {
        setFriendList(response.data.friendList);
        setAuthenticated(true)
      }
    } catch (error) {
      console.error('Error fetching friends: ', error);
      navigate(`/`)
    }
  };

  const searchFriends = async (username: string) => {
    try {
      const response = await axiosAuthInstance.get(`/user/${props.loggedId}/friend/search?username=${username}`);
      if (response.data && response.data[0].username) {
        setFriends(response.data);
        setNoResults(false); 
      } else {
        setFriends([]);
        setNoResults(true); 
      }
    } catch (error) {
      console.error('Error searching friends: ', error);
    }
  };

  const loopSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setFriends([]);
      setNoResults(false); 
    } else {
      searchFriends(value);
    }
  };

  const deleteFriend = async (username: string) => {
    try {
      await axiosAuthInstance.delete(`/user/${props.loggedId}/friend/delete`,{data: {
        username: username,
      }});
      fetchFriends();
    } catch (error) {
      console.error('Error deleting friends: ', error);
    }
  };

  const handleCreateSimpleConversation = async (id) =>{
    await axiosAuthInstance
      .post(
        `/user/${props.loggedId}/conversation`, 
        {
          name: null,
          picture: null,
          isGroup: false,
          ids: [id]
        }
      )
      .then(response => {
        navigate(`/user/${props.loggedId}/conversation/${response.data.conversationId}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    authenticated &&

    <>
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none ">
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[800px]">
        {/* HEADER */}
        <div className="p-5 border-b border-solid border-blueGray-200 rounded-t">
          <div className='flex items-center justify-between'>
            <h1 className="text-4xl font-bold">Amigos</h1>
            <div className="flex space-x-4 items-center">
              <button className="justify-end p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => props.setShowFriendListModal(false)}>
                <span className="bg-transparent text-black h-6 w-6 text-4xl block hover:text-gray-500 duration-150 pb-8">
                  ×
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* BODY */}   
        <div className='flex justify-end mx-4 mt-5 space-x-4'>
          <div className="flex space-x-4 items-center">
            {noResults && <p className="text-red-500">Amigo não encontrado</p>}
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar Amigos..."
                value={searchTerm}
                onChange={loopSearch}
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <button
            className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg duration-150"
            type="button"
            onClick={() => setShowAddFriendModal(true)}
            data-cy={"add-friend-modal-button"}
          >
            Adicionar amigo
          </button>
          <button
            className="text-center justify-end text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg duration-150"
            type="button"
            onClick={() => setShowCreateGroupModal(true)}
            data-cy={"new-group-button"}
          >
            Novo Grupo
          </button>               
        </div>
        <div className='flex-1 bg-gray-100 mx-4 my-5 rounded-lg shadow-lg overflow-y-auto'>
          <div
            className="friend-list-container overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 250px)' }}
          >
            {(friends.length ? friends : friendList).map((friend, index) => (
              <div
                key={friend.name}
                className={"friend-item bg-gray-200 hover:bg-gray-300 hover:shadow-lg p-4 rounded cursor-pointer flex justify-between items-center relative duration-150" + (index == 0 ? ""  : " mt-4")}
                data-cy={"friends-list-"+friend.name}
              >
                <button
                  onClick={() => handleCreateSimpleConversation(friend.id)}
                  className="friend-link flex-1 flex items-center"
                  data-cy={"friend-list-button-"+friend.username}
                >
                  {<FaUserCircle className="text-gray-500 mr-4 text-4xl" />}
                  <div className='flex items-center'>
                    <div className='flex items-center'>

                    <p className='text-xl font-semibold pe-4'>{friend.name}</p>
                    <p>({friend.username})</p>
                     
                    </div>
                  </div>
                </button>
                <FaTrash
                    className={"text-3xl text-red-600 hover:text-red-500 hover:shadow-lg duration-150"}
                    onClick={() => deleteFriend(String(friend.username))}
                />
              </div>
              )
            )}
        </div>
        </div>
      </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>

      {showAddFriendModal && (
        <AddFriendModal
          loggedId={props.loggedId}
          setShowAddFriendModal={setShowAddFriendModal}
          fetchFriends={fetchFriends}
        />
      )}

      {showCreateGroupModal && (
        <CreateGroupModal
          loggedId={props.loggedId}
          setShowCreateGroupModal={setShowCreateGroupModal}
        />
      )}
  </>
  );
}

export default FriendListModal;
