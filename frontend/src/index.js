import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DasContextProvider from './Context/DasContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DasContextProvider>
        <App />
    </DasContextProvider>
         
);