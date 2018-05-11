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
    caption: 'https://www.petdarling.com/articulos/como-eliminar-el-olor-a-pis-de-gato/',
    mpd: '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    title: '',
    description: 'Video 0 Description'
  },
  {
    id: 1,
    caption: 'https://www.petdarling.com/articulos/como-eliminar-el-olor-a-pis-de-gato/',
    mpd: '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    title: 'Video 1',
    description: 'Video 1 Description'
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
    this.setState({
      activeVideoId: id,
    });
  }
  
  render() {
    return (
      <div className={styles.container}>
        <MainVideoPlayer currentVideo={videos[this.state.activeVideoId]} />
        <VideoList _handleVideoSelection={this._handleVideoSelection} currentVideo={this.state.activeVideoId} videos={videos} />
      </div>
    );
  }
}

export default Body;
