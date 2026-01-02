import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom";
import Swiper from 'swiper';

import "./stylesheet/all.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from './App.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
