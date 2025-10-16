import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/poppins';
import Router from './Router';
import AuthProvider from '@contexts/authContext';
import { Toaster } from 'sonner';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
        <Toaster richColors position="top-center" />
        <Router/>
      </AuthProvider>
  </React.StrictMode>,
)
