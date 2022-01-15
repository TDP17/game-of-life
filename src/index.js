import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './index.css';

import App from './App';
import Game from './Components/PostStart/Game';
import Free from './Components/Free/Free';

import { LevelContextProvider } from './Components/utils/LevelContext';

ReactDOM.render(
  <BrowserRouter >
    <LevelContextProvider>
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path="/game" element={<Game />} />
          <Route path="/free" element={<Free />} />
        </Routes>
    </LevelContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

