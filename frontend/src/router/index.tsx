import { Routes, BrowserRouter, Route } from "react-router-dom";
import ConversationList from "../app/home/pages/ConversationList";
import ConversationPage from "../app/home/pages/ConversationPage";
import FriendList from "../app/home/pages/FriendList";
import Login from "../app/home/pages/Login/index";


export function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/user/:loggedId/conversation" element={<ConversationList />} />
          <Route path="/user/:loggedId/conversation/:conversationId" element={<ConversationPage />} />
          <Route path="/user/:loggedId/friend/all" element={<FriendList />} />
          <Route path="/user/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }