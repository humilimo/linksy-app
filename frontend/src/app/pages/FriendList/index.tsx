import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaUserCircle, FaSearch, FaTrash, FaComment } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import AddFriendModal from '../../components/FriendsList/AddFriendModal';
import FriendInfoModal from '../../components/FriendsList/FriendInfoModal';
import { FriendProps } from '../../components/FriendsList/FriendsListModel';
import axiosAuthInstance from '../../../API/axiosAuthInstance';

function FriendList() {
  const { loggedId } = useParams<{ loggedId: string }>();
  const [friendList, setFriendList] = useState<FriendProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showFriendInfoModal, setShowFriendInfoModal] = useState(false);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friend, setFriend] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriends();
  }, [loggedId,friendList]);

  const fetchFriends = async () => {
    try {
      const response = await axiosAuthInstance.get(`/user/${loggedId}/friend/all`);
      if (response) {
        setFriendList(response.data.friendList);
        setAuthenticated(true)
      }
    } catch (error) {
      setError('Error fetching friends');
      console.error(error);
      navigate(`/`)
    }
  };

  const searchFriends = async (username: string) => {
    try {
      const response = await axiosAuthInstance.get(`/user/${loggedId}/friend/search?username=${username}`);
      if (response.data && response.data[0].username) {
        setFriends(response.data);
        setNoResults(false); 
      } else {
        setFriends([]);
        setNoResults(true); 
      }
    } catch (error) {
      setError('Error searching friends');
      console.error(error);
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
      await axiosAuthInstance.delete(`/user/${loggedId}/friend/delete`,{data: {
        username: username,
      }});
      fetchFriends();
    } catch (error) {
      setError('Error deleting friens');
      console.error('Error deleting friens:', error);
    }
  };

  return (
    authenticated &&
    <div className="p-6 pt-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between pb-8">
          <h1 className="text-4xl font-bold">Amigos</h1>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends..."
                value={searchTerm}
                onChange={loopSearch}
                className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              {noResults && <p className="text-red-500 absolute left-4 top-full mt-1">Amigo não encontrado</p>}
            </div>
            <button
              className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => setShowAddFriendModal(true)}
            >
              Adicionar amigo
            </button>
            <button
              className="text-center text-white py-2 px-5 rounded-2xl bg-green-600 hover:bg-green-500 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              onClick={() => navigate(`/user/${loggedId}/conversation`)}
            >
              Voltar
            </button>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div
          className="friend-list-container overflow-y-auto"
          style={{ maxHeight: 'calc(100vh - 250px)' }}
        >
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <Link
                key={index}
                to={`/user/${loggedId}/conversation/${friend.id}`}
                className="friend-item bg-gray-200 p-4 mb-4 rounded flex justify-between"
              >
                <div className="flex items-center">
                  <FaUserCircle className="text-gray-500 mr-4 text-4xl" />
                  <div>
                    <div className="text-xl font-bold mb-2 text-black-600">{friend.name}</div>
                    <p>{friend.bio}</p>
                  </div>
                </div>
                <div className="text-right">
                  <h2 className="text-sm font-semibold">{friend.username}</h2>
                </div>
              </Link>
            ))
          ) : (
            friendList.map(friend => (
              <div
                key={friend.id}
                className="friend-item bg-gray-200 p-4 mb-4 rounded cursor-pointer flex justify-between items-center relative"
                data-cy={"friend-id-"+friend.id}
              >
                <button
                  onClick={() => {setShowFriendInfoModal(true); setFriend(friend)}}
                  className="friend-link flex-1 flex items-center"
                >
                  {<FaUserCircle className="text-gray-500 mr-4 text-4xl" />}
                  <div>
                    <div className='flex items-center'>
                      <h2 className="text-xl font-semibold">{friend.name}</h2>
                      {(
                        <h3 className='ml-4 text-gray-500' data-cy={`friend-list-username-${friend.username}`}>
                          {`${friend.bio}`}
                        </h3>
                      )}
                    </div>
                  </div>
                </button>
                <div className="relative flex items-center space-x-4">
                <FaComment
                    className={`cursor-pointer text-3xl ${false ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => navigate(`/user/${loggedId}/conversation/${friend.id}`)}
                />
                <FaTrash
                    className={`cursor-pointer text-3xl ${false ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => deleteFriend(String(friend.username))}
                />
                </div>
            </div>   
            ))
          )}
        </div>
      </div>

      {showFriendInfoModal && (
        <FriendInfoModal
          friendInfo={friend}
          loggedId={loggedId}
          setShowFriendInfoModal={setShowFriendInfoModal}
        />
      )}

      {showAddFriendModal && (
        <AddFriendModal
          loggedId={loggedId}
          setShowAddFriendModal={setShowAddFriendModal}
        />
      )}
    </div>
  );
}

export default FriendList;
