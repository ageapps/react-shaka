import React, { Component } from 'react';
import styles from './VideoListItem.css';
import { Card } from 'reactstrap';
  
class VideoListItem extends Component {
  render() {
    return (
      <Card>
      <div className={styles.container}>
        <img className={styles.image} src={this.props.video.caption} alt=''/>
        <div className={styles.description}>
          <h3>
            {this.props.video.title}
          </h3>
          <p>
            {this.props.video.description}
          </p>
        </div>
      </div>
      </Card>
    );
  }
}

export default VideoListItem;
