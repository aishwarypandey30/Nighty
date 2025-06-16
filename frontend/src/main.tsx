import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { BrowserRouter as Router } from "react-router-dom" ;
import AppRoutes from "./AppRoutes"
import Auth0Provider  from './auth/AuthProvider';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Auth0Provider>
        <AppRoutes />
      </Auth0Provider>
    </Router>
  </StrictMode>
);
