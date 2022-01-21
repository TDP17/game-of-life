import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';

import App from './App';
import GameController from './Components/Game/GameController';
import Free from './Components/Free/Free';


ReactDOM.render(
  <BrowserRouter >
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path="/game" element={<GameController />} />
          <Route path="/free" element={<Free />} />
        </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

