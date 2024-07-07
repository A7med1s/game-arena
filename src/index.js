import React from 'react';
import reportWebVitals from "./reportWebVitals"
import ReactDOM from 'react-dom/client';
import './index.css';
import './my-tailwind.css'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));


  reportWebVitals(root.render(
    <React.StrictMode>

        <App/>

    </React.StrictMode>
    ));
