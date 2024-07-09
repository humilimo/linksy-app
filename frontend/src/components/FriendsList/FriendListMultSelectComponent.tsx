import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsPeopleFill, BsCircle } from "react-icons/bs";
import {FriendProps} from './FriendsListModel'


function FriendListMultSelectComponent(props) {
  const [friendList, setFriendList] = useState<FriendProps[] | null>(null);
  const fetchFriendListData = async () => {
    await axios
      .get(
        `http://127.0.0.1:3002/user/${props.loggedId}/friend/all`
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
        {friendList?.map(friend => (
          <li key={friend.id} className="text-black mb-2 flex items-center justify-between">
            <div className='flex items-center'>
              <div className='relative pe-4'>
                {friend.picture ? (
                  <img src={friend.picture} alt={friend.name} className="w-10 h-10 rounded-full"/>
                ) : (
                  <div className='relative'>
                    <BsCircle className="w-12 h-12"/>
                    <BsPeopleFill className="w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                  </div>
                )}
              </div>
              <p className='pe-4'>{friend.name}</p>
              <p className='pe-4'>({friend.username})</p>
            </div>
            <input className="form-checkbox h-6 w-6 text-primary border-2 border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary" type="checkbox" onChange={() => handleCheckBox(friend.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FriendListMultSelectComponent;