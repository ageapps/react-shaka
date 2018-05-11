import React, { Component } from 'react';
import VideoListItem from './VideoListItem';

import styles from './VideoList.css';

let videos;
let currentVideo;

class VideoList extends Component {
  constructor(props){
    super(props);
    videos = props.videos.filter((video => video.id !== currentVideo));
  }
  render() {
    
    const listItems = videos.map((item) => 
        <VideoListItem key={item.id} video={item}/>
    );

    return (
      <div className={styles.container}>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default VideoList;
