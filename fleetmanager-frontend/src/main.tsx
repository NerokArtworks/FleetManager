import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster richColors position="top-center" duration={1000} />
      <App />
    </AuthProvider>
  </React.StrictMode>
);