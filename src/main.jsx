import React from 'react';import {createRoot} from 'react-dom/client';import {HashRouter} from 'react-router-dom';import App from './App.jsx';import './styles.css';
if(localStorage.getItem('fasih:dark')==='1')document.body.classList.add('dark');
createRoot(document.getElementById('root')).render(<HashRouter><App/></HashRouter>);
