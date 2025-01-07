import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryProvider from "./Providers/ReactQueryProvider.tsx";
import { SocketProvider } from "./Providers/SocketProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ReactQueryProvider>
  </StrictMode>
);
