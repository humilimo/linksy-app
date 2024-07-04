import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BsPeopleFill, BsCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';


function ConversationProfile() {
  const navigate = useNavigate();
  const location = useLocation();


  const { loggedId } = useParams<{ loggedId: string }>();

  return (
    <div className="p-6 pt-8 bg-gray-100 min-h-screen">
      <div className='bg-white p-6 rounded-lg shadow-lg'>
        <div className="flex items-center justify-center pb-8">
          <p className="ps-8 text-4xl font-bold">Conversation List</p>
          {(location.state && location.state.destroyMessage) ? (
            <p> {location.state.destroyMessage}</p>
          ) : null}
        </div>
        </div>
    </div>
  );

  
}

export default ConversationProfile;