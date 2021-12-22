import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import './globals.css';
import BlackHole from './routes/sketches/black-hole/BlackHole';
import FlowField from './routes/sketches/flow-field/FlowField';
import IntersectingBubbles from './routes/sketches/intersecting-bubbles/IntersectingBubbles';
import MouseFollow from './routes/sketches/mouse-follow/MouseFollow';
import ChaosGame from './routes/sketches/chaos-game/ChaosGame';
import Flocking from './routes/sketches/flocking/Flocking';
import CircularMotion from './routes/sketches/circular-motion/CircularMotion';
import MouseConfetti from './routes/sketches/mouse-confetti/MouseConfetti';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/sketches/mouse-follow" element={<MouseFollow />} />
        <Route path="/sketches/chaos-game" element={<ChaosGame />} />
        <Route path="/sketches/intersecting-bubbles" element={<IntersectingBubbles />} />
        <Route path="/sketches/black-hole" element={<BlackHole />} />
        <Route path="/sketches/flow-field" element={<FlowField />} />
        <Route path="/sketches/flocking" element={<Flocking />} />
        <Route path="/sketches/circular-motion" element={<CircularMotion />} />
        <Route path="/sketches/mouse-confetti" element={<MouseConfetti />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
