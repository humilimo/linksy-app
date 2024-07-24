import { Routes, BrowserRouter, Route } from "react-router-dom";
import ConversationList from "../app/pages/ConversationList/ConversationList";
import ConversationPage from "../app/pages/ConversationPage/ConversationPage";
import Login from "../app/pages/Login/index";
import AccountCreationPage from "../app/pages/AccountCreationPage/SignUp";

export function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/user/:loggedId/conversation" element={<ConversationList />} />
          <Route path="/user/:loggedId/conversation/:conversationId" element={<ConversationPage />} />
          <Route path="/signUp" element={<AccountCreationPage />} />
        </Routes>
      </BrowserRouter>
    );
  }