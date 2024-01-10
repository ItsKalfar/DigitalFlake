import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.tsx";
import { GlobalContextProvider } from "./context/GlobalContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <AuthProvider>
          <Toaster />
          <App />
        </AuthProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
