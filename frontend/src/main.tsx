import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoadingContextProvider } from "./common/hooks/useLoading.tsx";
import { StrictMode } from "react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <LoadingContextProvider>
        <App />
      </LoadingContextProvider>
    </StrictMode>
  </BrowserRouter>
);
