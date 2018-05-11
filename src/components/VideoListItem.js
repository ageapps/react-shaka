import React, { Component } from 'react';
import styles from './VideoListItem.css';

class VideoListItem extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.video.title}
      </div>
    );
  }
}

export default VideoListItem;
