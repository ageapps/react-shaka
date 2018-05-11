import React, { Component } from 'react';
import MainVideoPlayer from './MainVideoPlayer';
import VideoList from './VideoList';

import styles from './Body.css';

class Body extends Component {
  render() {
    return (
      <div className={styles.container}>
        <MainVideoPlayer/>
        <VideoList/>
      </div>
    );
  }
}

export default Body;
