import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { ContextArea } from './components/Context/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextArea>
      <App />
    </ContextArea>
  </React.StrictMode>
);


