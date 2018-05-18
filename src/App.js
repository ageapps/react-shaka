import React, { Component } from 'react';
import Body from './components/Body';
import styles from './App.css';


class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.header}>
          <h1 className={styles.title}>Welcome to a Shaka-Player demo built with React</h1>
          <a className={styles.link} href="https://github.com/ageapps/react-shaka"> <img alt="" src="https://wordeology.com/images/github-logo.png" /></a>
        </header>
        <Body/>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
      </div>
    );
  }
}

export default App;
