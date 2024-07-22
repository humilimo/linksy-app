import React, { useEffect, useState } from 'react';
import axiosAuthInstance from '../../../API/axiosAuthInstance';
import Form from '../../components/AccountCreation/Form';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { BsPeopleFill, BsCircle } from "react-icons/bs";
// import { useNavigate } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
// import ConversationProfileMenu from "../ConversationProfile/index";


function AccountCreationPage() {

    // const postUser = async () => {
    //     try {
    //       const response = await axiosAuthInstance.post(`/user/register`);
    //       if (response.data) {
    //         setConversations(response.data);
    //         setAuthenticated(true)
    //       }
    //     } catch (error) {
    //       setError('Error fetching conversations');
    //       console.error(error);
    //       navigate(`/user/login`)
    //     }
    // };

  return (
    <div className="flex w-full h-screen bg-gray-200">
        <div className="w-full flex items-center justify-center lg:w-1/2">
        {/* <div className="w-full flex items-center justify-center"> */}
            <Form />
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            <div className="w-60 h-60 bg-gradient-to-tr from-blue-500 to-pink-500 rounded-full animate-spin"/>
            <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
        </div>
    </div>
  );

  
}

export default AccountCreationPage;