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
    caption: 'https://cde.laprensa.e3.pe/ima/0/0/1/8/1/181973.jpg',
    mpd: '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd',
    title: 'Star Trek',
    description: 'Video of Star Treks movie angel one in several languajes'
  },
  {
    id: 1,
    caption: 'https://ak8.picdn.net/shutterstock/videos/5992838/thumb/1.jpg?i10c=img.resize(height:160)',
    mpd: 'https://vm2.dashif.org/livesim/utc_head/periods_20/testpic_2s/Manifest.mpd',
    title: 'Video test live',
    description: 'Video test live of colors with continuous counter'
  },
  {
    id: 2,
    caption: 'https://cdn.vox-cdn.com/thumbor/IhQFIdCvhHVaQY4oe0F2hUOJGBk=/206x0:893x458/1200x800/filters:focal(206x0:893x458)/cdn.vox-cdn.com/assets/1462857/graded_edit_012270.jpg',
    mpd: 'https://media.axprod.net/TestVectors/v7-Clear/Manifest_MultiPeriod.mpd',
    title: 'Angels of steel',
    description: 'Video of movie angels of steel'
  },
  {
    id: 3,
    caption: 'https://i.ytimg.com/vi/HOfdboHvshg/hqdefault.jpg',
    mpd: 'https://storage.googleapis.com/shaka-demo-assets/sintel-trickplay/dash.mpd',
    title: 'Sintel',
    description: 'Video of movie sintel'
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
    this.setState({
      activeVideoId: id,
    });
  }
  
  render() {
    return (
      <div className={styles.container}>
        <MainVideoPlayer currentVideo={videos[this.state.activeVideoId]} />
        {/* <p>{this.state.activeVideoId}</p> */}
        <VideoList _handleVideoSelection={this._handleVideoSelection} currentVideo={this.state.activeVideoId} videos={videos} />
      </div>
    );
  }
}

export default Body;
