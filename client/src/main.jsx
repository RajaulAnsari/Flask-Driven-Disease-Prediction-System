import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// Import React Query's client and provider for managing server state
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Provide the QueryClient to the entire app via context */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
