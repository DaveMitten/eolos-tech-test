import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { createRoot } from "react-dom/client";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from './App';


// Create a client
const queryClient = new QueryClient()

export default function Main() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}



createRoot(document.getElementById('root') as HTMLElement).render(<Main />)
