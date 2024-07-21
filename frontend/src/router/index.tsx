import { Routes, BrowserRouter, Route } from "react-router-dom";
import ConversationList from "../app/pages/ConversationList/ConversationListPage";
import ConversationPage from "../app/pages/ConversationPage/ConversationPage";
import FriendList from "../app/pages/FriendList";
import Login from "../app/pages/Login/index";


export function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/user/:loggedId/conversation" element={<ConversationList />} />
          <Route path="/user/:loggedId/conversation/:conversationId" element={<ConversationPage />} />
          <Route path="/user/:loggedId/friend/all" element={<FriendList />} />
        </Routes>
      </BrowserRouter>
    );
  }