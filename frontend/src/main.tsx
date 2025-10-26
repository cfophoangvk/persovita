import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LoadingContextProvider } from "./common/hooks/useLoading.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </BrowserRouter>
);
