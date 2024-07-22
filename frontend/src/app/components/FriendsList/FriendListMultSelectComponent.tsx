import { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import {FriendProps} from './FriendsListModel'
import axiosAuthInstance from '../../../API/axiosAuthInstance';


function FriendListMultSelectComponent(props) {
  const [friendList, setFriendList] = useState<FriendProps[] | null>(null);
  const fetchFriendListData = async () => {
    await axiosAuthInstance
      .get(
        `/user/${props.loggedId}/friend/all` 
      )
      .then(response => {
        if (response.data.friendList){
          setFriendList(response.data.friendList.filter(friend => !props.participants?.map(p => p.id).includes(friend.id)));
        }
      })
      .catch(error => {
        console.log(error);
      });
    };
    
  useEffect(() => {
    fetchFriendListData();
  }, []);

  const handleCheckBox = async (id) =>{
    props.setIdList(props.idList.includes(id) ? props.idList.filter(i => i != id) : props.idList.concat(id));
  }

  return (
    <div className="relative p-6 overflow-y-auto">
      <ul className='lista'>
        {friendList?.map((friend, index) => (
          <li key={friend.id} className={"text-black flex items-center justify-between"+(index == 0 ? "" : " pt-2")} >
            <div className='flex items-center'>
              <div className='relative pe-4'>
                {friend.picture ? (
                  <img src={friend.picture} alt={friend.name} className="w-10 h-10 rounded-full"/>
                ) : (
                  <FaUserCircle className="text-gray-500 w-12 h-12"/>
                )}
              </div>
              <p className='pe-4'>{friend.name}</p>
              <p className='pe-4'>({friend.username})</p>
            </div>
            <input className="form-checkbox h-6 w-6 text-primary border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary" type="checkbox" onChange={() => handleCheckBox(friend.id)} data-cy={"friend-list-checkbox-"+friend.username}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FriendListMultSelectComponent;