import React, { Component } from 'react';
import MainVideoPlayer from './MainVideoPlayer';
import VideoList from './VideoList';

import './Body.css';

class Body extends Component {
  render() {
    return (
      <div className="container">
        <MainVideoPlayer/>
        <VideoList/>
      </div>
    );
  }
}

export default Body;
