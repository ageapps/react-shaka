import React, { Component } from 'react';
import MainVideoPlayer from './MainVideoPlayer';
import VideoList from './VideoList';

import './Body.css';

let manifests = ['//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'];

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeVideo: '0'
    };
  }

  _handleVideoSelection = (id) => {
    this.setState({
      activeVideo: id,
    })
  }

  render() {
    return (
      <div className="container">
        <MainVideoPlayer manifestUri={manifests[this.state.activeVideo]} />
        <VideoList _handleVideoSelection={_this._handleVideoSelection} manifests={manifests} />
      </div>
    );
  }
}

export default Body;
