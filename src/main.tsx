import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryProvider from "./Providers/ReactQueryProvider.tsx";
import { SocketProvider } from "./Providers/SocketProvider.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { BrowserRouter } from "react-router";
import {ToastProvider} from "oasis-toast"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
    <ReactQueryProvider>
      <BrowserRouter>
        <UserProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </UserProvider>
      </BrowserRouter>
    </ReactQueryProvider>
    </ToastProvider>
  </StrictMode>
);
