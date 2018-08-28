import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
// import SOMETHING from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import Game from './game.js'
import Home from './home.js'
import PostGame from './postgame.js'
import axios from 'axios'

// const myDomain = 'http://localhost:1337';
const myDomain = 'http://aad0c6b3.ngrok.io';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      chapter: '',
      points: 0,
      currentPage: 'home',
      // pointState: [
      //   {chapter: 'None',
      //   points: 0},
      //
      //   {
      //     chapter: 'Beta Theta Pi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Delta Chi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Delta Sigma Phi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Delta Tau Delta',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Delta Upsilon',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Delta Theta',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Gamma Delta',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Kappa Psi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Kappa Tau',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Kappa Theta',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Pi Kappa Phi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Sigma Alpha Epsilon',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Sigma Chi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Sigma Nu',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Theta Chi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Zeta Beta Tau',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Zeta Psi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Alpha Chi Omega',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Alpha Gamma Delta',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Alpha Phi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Delta Gamma',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Kappa Alpha Theta',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Mu',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Phi Sigma Rho',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Pi Beta Phi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Sigma Psi',
      //     points: 0
      //   },
      //   {
      //     chapter: 'Sigma Sigma Sigma',
      //     points: 0
      //   }
      // ]
    }
  }

  navigate(newPage){
    this.setState({
      currentPage: newPage
    })
  }

  startGame(playerName, playerChapter){
    this.setState({
      name: playerName,
      chapter: playerChapter,
      currentPage: 'game'
    })
  }

  endGame(points){
    //
    // this.state.pointState.forEach(entry => {
    //   if (entry.chapter === this.state.chapter){
    //     entry.points = entry.points + points;
    //   }
    // })
    fetch(myDomain + '/addPoints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chapter: this.state.chapter,
        points: points,
      })
    }).then((res) => {
      this.setState({
        points: points,
        currentPage: 'postgame'
      })

    }).catch(err => console.log('fetch failed', err))
}
    // fetch(myDomain + '/addPoints', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     chapter: this.state.chapter,
    //     points: points,
    //   }),
    // });



  render() {
    return (
      <div>
        {this.state.currentPage === 'home'? <Home startGame={this.startGame.bind(this)}/> : null}
        {this.state.currentPage === 'game'? <Game endGame={this.endGame.bind(this)} name={this.state.name} chapter={this.state.chapter} navigate={this.navigate.bind(this)}/> : null}
        {this.state.currentPage === 'postgame'? <PostGame pointState={this.state.pointState} chapter={this.state.chapter} points={this.state.points} name={this.state.name} chapter={this.state.chapter} navigate={this.navigate.bind(this)}/> : null}
      </div>
    );
  }
}

export default App;
