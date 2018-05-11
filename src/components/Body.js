import React, { Component } from 'react';
import MainVideoPlayer from './MainVideoPlayer';
import VideoList from './VideoList';

import styles from './Body.css';

class Body extends Component {
  render() {
    return (
      // <div className={styles.container}>
      <div style={{display: 'flex',  height: '100%'}}>
        <MainVideoPlayer/>
        <VideoList/>
      </div>
    );
  }
}

export default Body;
