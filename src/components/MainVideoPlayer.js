import React, { Component } from 'react';
import shaka from 'shaka-player';
import { Button, Table, FormGroup, Label, Input } from 'reactstrap';
import styles from './MainVideoPlayer.css';

// var manifestUri = '//storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
let mainVideo;
let player;

class MainVideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.trackSelectorRef = React.createRef();

    this.state = {
      trackInfo: {
        width: 0,
        height: 0,
        bitrate: 0,
        bandwidth: 0,
        videoCodec: '',
        language: '',
        framerate: 0,
        mimeType: '',
        audioCodec: '',
        audioBandwidth: ''
      },
      tracks: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentVideo !== this.props.currentVideo) {
      this.loadPlayer(this.props.currentVideo.mpd);
    }
  }

  componentDidMount() {
    // Fill in the language preferences based on browser config, if available.
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
    player.addEventListener('adaptation', this.onAdaptationEvent);

    this.loadPlayer(this.props.currentVideo.mpd);
  }
  loadPlayer(mpd) {
    if (!player) return;
    // Try to load a manifest.
    // This is an asynchronous process.
    player
      .load(mpd)
      .then(() => {
        this._getTrackInfo(player);
        let tracks = player.getVariantTracks();

        this.setState({
          tracks: tracks
        });

        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
      })
      .catch(this.onError); // onError is executed if the asynchronous load fails.
  }

  onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  onAdaptationEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this._getTrackInfo(player);
  }

  onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  _getTrackInfo(player) {
    var tracks = player.getVariantTracks();
    var activeTrack;

    // Add track info to the DOM.
    for (var i = 0; i < tracks.length; ++i) {
      var track = tracks[i];
      if (track.active) activeTrack = track;
    }
    this.setState({
      trackInfo: {
        width: activeTrack.width,
        height: activeTrack.height,
        bitrate: (activeTrack.bandwidth / 1024).toFixed(0),
        bandwidth: activeTrack.bandwidth,
        videoCodec: activeTrack.videoCodec,
        audioCodec: activeTrack.audioCodec,
        language: activeTrack.language,
        framerate: activeTrack.frameRate,
        mimeType: activeTrack.mimeType,
        audioBandwidth: activeTrack.audioBandwidth
      }
    });

    // Correct aspect ratio.
    if (activeTrack) {
      var aspectRatio = activeTrack.width / activeTrack.height;
      // this.ref.video.width = this.ref.video.height * aspectRatio;
    } else {
      console.error('Unable to query aspect ratio!');
    }
  }

  componentWillUnmount() {
    // unmount stuff
    // kill stream hogging...:)
    player.unload();
  }

  _handleConfig() {
    // player.selectVariantTrack(this.state.tracks[this.ref.trackSelector.id]);
    if (!player) return;

    var tracks = player.getVariantTracks();
    // var tracks = this.state.tracks;

    console.log(this.trackSelectorRef.current.value);
    // Add track info to the DOM.
    for (var i = 0; i < tracks.length; ++i) {
      var track = tracks[i];

      if (track.id === parseInt(this.trackSelectorRef.current.value)) {
        player.selectVariantTrack(track, true);
      }
    }
    this._getTrackInfo(player);
  }

  render() {
    let trackSelector = this.state.tracks.map(item => (
      <option key={item.id} value={item.id}>
        Res: {item.width}x{item.height}, BW: {item.bandwidth}, Lang: {item.language}
      </option>
    ));

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
          <h1>Track selection</h1>
          {/* <div>
            <select ref={this.trackSelectorRef}>{trackSelector}</select>
          </div> */}
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <div>
            <select ref={this.trackSelectorRef}>{trackSelector}</select>
          </div>
          </FormGroup>
          <Button onClick={this._handleConfig.bind(this)}>Load track</Button>
        </div>

        <div className={styles.table}>
        <Table bordered condensed striped>
          <tbody>
            <tr>
              <td> Resolution </td>
              <td>
                {this.state.trackInfo.width}x{this.state.trackInfo.height}
              </td>
            </tr>
            <tr>
              <td> Bandwidth </td>
              <td>{this.state.trackInfo.bandwidth}</td>
            </tr>
            <tr>
              <td> Bitrate </td>
              <td>{this.state.trackInfo.bitrate} kbps</td>
            </tr>
            <tr>
              <td> Framerate </td>
              <td>{this.state.trackInfo.framerate}</td>
            </tr>
            <tr>
              <td>Video Codec </td>
              <td>{this.state.trackInfo.videoCodec}</td>
            </tr>
            <tr>
              <td>Audio Codec </td>
              <td>{this.state.trackInfo.audioCodec}</td>
            </tr>
            <tr>
              <td>Audio Bandwidth </td>
              <td>{this.state.trackInfo.audioBandwidth}</td>
            </tr>
            <tr>
              <td> Language </td>
              <td>{this.state.trackInfo.language}</td>
            </tr>
            <tr>
              <td> MIME Type </td>
              <td>{this.state.trackInfo.mimeType}</td>
            </tr>
          </tbody>
        </Table>
        </div>
      </div>
    );
  }
}

export default MainVideoPlayer;
