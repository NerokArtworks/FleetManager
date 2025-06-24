import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';
import { queryClient } from './lib/query-client.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-center" duration={1000} />
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);