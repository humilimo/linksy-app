import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BsPeopleFill, BsCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ConversationProfileMenu from "../ConversationProfile/index";


function ConversationPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <ConversationProfileMenu />
    </div>
  );

  
}

export default ConversationPage;