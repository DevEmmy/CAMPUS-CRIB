import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryProvider from "./Providers/ReactQueryProvider.tsx";
import { SocketProvider } from "./Providers/SocketProvider.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
    <UserProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </UserProvider>
    </ReactQueryProvider>
  </StrictMode>
);
