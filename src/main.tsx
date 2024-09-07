import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainPage from "./pages/main-page.tsx";
import "./index.css";
import { JobsProvider } from "./hooks/JobsContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JobsProvider>
      <MainPage />
    </JobsProvider>
  </StrictMode>
);
