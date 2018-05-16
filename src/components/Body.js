import React, { Component } from 'react';
import MainVideoPlayer from './MainVideoPlayer';
import VideoList from './VideoList';

import styles from './Body.css';

const videos = [
  // {
  //   caption: '',
  //   mpd: '',
  //   title: '',
  //   description: ''
  // },
  {
    id: 0,
    caption: 'http://www.catster.com/wp-content/uploads/2017/08/Hairless-cat.jpg',
    mpd: 'http://localhost:8000/out/whooping3/manifest.mpd',
    title: 'Hairless Cat',
    description: 'Video 0, hearless cat'
  },
  {
    id: 1,
    caption: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC_1cvH240d8UYYYJgY8d-Eh9BJZkr_EyqDAlkfjU05eikqXxdWg',
    mpd: 'http://pihostadri.ddns.net:8888/final2/final2.mpd',
    title: 'Angry Cat',
    description: 'Video 1, angry cat'
  },
  
];

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeVideoId: videos[0].id
    };
  }

  _handleVideoSelection = (id) => {
    console.log("Selected "+id);
    this.setState((prevState, props) => ({
      activeVideoId: id,
    }));
  }
  
  render() {
    return (
      <div className={styles.container}>
        <MainVideoPlayer currentVideo={videos[this.state.activeVideoId]} />
        <p>{this.state.activeVideoId}</p>
        <VideoList _handleVideoSelection={this._handleVideoSelection} currentVideo={this.state.activeVideoId} videos={videos} />
      </div>
    );
  }
}

export default Body;
