import { Routes, BrowserRouter, Route } from "react-router-dom";
import ConversationList from "../app/home/pages/ConversationList";
import ConversationPage from "../app/home/pages/ConversationPage";


export function Router() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/user/:loggedId/conversation" element={<ConversationList />} />
          <Route path="/user/:loggedId/conversation/:conversationId" element={<ConversationPage />} />
        </Routes>
      </BrowserRouter>
    );
  }