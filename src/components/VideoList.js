import React, { Component } from 'react';
import VideoListItem from './VideoListItem';

import styles from './VideoList.css';

let videos;
let currentVideo;

class VideoList extends Component {
  constructor(props){
    super(props);
    currentVideo = props.currentVideo;
    videos = props.videos.filter((video => video.id !== currentVideo));
  }

  handleClick(id){
    this.props._handleVideoSelection(id);
  }
  render() {
    
    const listItems = videos.map((item) => 
        <div key={item.id} onClick={this.handleClick.bind(this,item.id)}>
          <VideoListItem video={item} />
        </div>
    );

    return (
      <div className={styles.container}>
        <div className={styles.list} >{listItems}</div>
      </div>
    );
  }
}
export default VideoList;
