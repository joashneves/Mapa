import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Mapa from './router/Mapa.jsx';
import Gerencia from './router/Gerencia.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Mapa/>,
  },
  {
    path: "adm",
    element: <Gerencia/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
