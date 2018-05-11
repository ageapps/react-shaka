import React, { Component } from 'react';
import shaka from 'shaka-player';
import './MainVideoPlayer.css';

// var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';

class MainVideoPlayer extends Component {
  componentDidMount() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      // Everything looks good!
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      console.error('Browser not supported!');
    }
  }

  initPlayer() {
    var player = new shaka.Player(this.refs.video);

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(this.props.manifestUri)
      .then(function() {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  componentWillUnmount() {
    // unmount stuff
    // kill stream hogging...:)
  }

  render() {
    return (
      <div className="container">
        <h2>Player</h2>
        <video
          ref="video"
          width="640"
          controls
          // autoPlay
        />
      </div>
    );
  }
}

export default MainVideoPlayer;
