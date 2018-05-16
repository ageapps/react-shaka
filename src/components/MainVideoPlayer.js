import React, { Component } from 'react';
import shaka from 'shaka-player';
import styles from './MainVideoPlayer.css';

// var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
let mainVideo;
let player;

class MainVideoPlayer extends Component {
  constructor(props){
    super(props);

    mainVideo = props.currentVideo;
    console.log(mainVideo);
    this.state = {
      trackInfo: {
        width: 0,
        height: 0,
        bitrate: 0
      }
    };
  }
  componentWillUpdate(nextProps, nextState){
    // this.loadPlayer(nextProps.currentVideo.mpd);
  }

  componentDidMount() {
    // Fill in the language preferences based on browser config, if available.
    let language = navigator.language || 'en-us';

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
    player = new shaka.Player(this.refs.video);

    // Listen for error events.
    player.addEventListener('error', this.onErrorEvent);

    // this.loadPlayer(this.props.currentVideo.mpd);

  }
  loadPlayer(mpd) {
    if (!player) return
    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(mpd)
      .then(() => {
        var tracks = player.getVariantTracks();
        var activeTrack;

        // Add track info to the DOM.
        for (var i = 0; i < tracks.length; ++i) {
          var track = tracks[i];
          if (track.active) activeTrack = track;
          this.setState({
            trackInfo: {
              width: track.width,
              height: track.height,
              bitrate: (track.bandwidth / 1024).toFixed(0)
            }
          });

          // var li = document.createElement('li');
          // li.textContent = text;
          // ul.appendChild(li);
        }

        // Correct aspect ratio.
        if (activeTrack) {
          var aspectRatio = activeTrack.width / activeTrack.height;
          this.ref.video.width = this.ref.video.height * aspectRatio;
        } else {
          console.error('Unable to query aspect ratio!');
        }
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
      <div className={styles.container}>
        <h2>Player</h2>
        <video
          ref="video"
          width="640"
          controls
          // autoPlay
        />
        <div>
            <p>
              Resolution: {this.state.trackInfo.width}x{this.state.trackInfo.height}
            </p>
            <p>Bitrate: {this.state.trackInfo.bitrate} kbps</p>
        </div>
      </div>
    );
  }
}

export default MainVideoPlayer;
