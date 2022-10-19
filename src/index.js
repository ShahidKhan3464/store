import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './contextApi/Context'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
        <Router>
            <App />
        </Router>
    </AppProvider>
);