import React from 'react';
import './App.css';
import Radar from './radar';
import spaceVideo from './Space-video.mp4';

const App = () => {
  return (
    <div className="app">
      <video className="video-background" autoPlay loop muted>
        <source src={spaceVideo} type="video/mp4" />
      </video>
      <h1 className="title">Meteor Blaster</h1>
      <Radar />
    </div>
  );
};

export default App;

