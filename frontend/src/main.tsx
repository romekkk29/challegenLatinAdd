import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/poppins';
import Router from './Router';
import { Provider } from 'react-redux'
import { store } from '@redux/store'
import { Toaster } from 'sonner';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
        <Toaster richColors position="top-center" />
        <Router/>
      </Provider>
  </React.StrictMode>,
)
