import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RaisedButton from 'material-ui/RaisedButton'
var stylesheet = require('./stylesheet.js').stylesheet;

var individualScoreEntry = stylesheet.individualScoreEntry;
var startNewGame = stylesheet.startNewGame;


// const myDomain = 'http://localhost:1337'
const myDomain = 'http://aad0c6b3.ngrok.io';

export default class PostGame extends Component {
  constructor(props){
    super(props);

    this.state = {
      scoreBoard: []
    }

  }

  componentDidMount(){

    //this.props.pointState


    console.log('reached postgame');
    fetch(myDomain + '/getScoreBoard', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
    .then(json => {
      this.setState({scoreBoard: json.results});
    }).catch(err => console.log('fetch failed', err))

  }
  render(){
    let scoreBoardDisplay = [];
    this.state.scoreBoard.forEach(entry => {
      scoreBoardDisplay.push(<ScoreBoardEntry chapter={entry.chapter} points={entry.points}/> )
    })
    return (
      <MuiThemeProvider>
      <div style ={{textAlign: 'center', backgroundColor: '#258E1E'}}>
        <div style= {{height: '30px', width: '100%', textAlign: 'center', color: 'white'}}>
        {this.props.chapter !== 'None'? (
          <h2> Congratulations {this.props.name}!! You scored {this.props.points} points for {this.props.chapter}! </h2> )
          : <h2> Congratulations {this.props.name}!! You scored {this.props.points} points! </h2>}
        </div>

        <h2 style= {{color: 'white'}}> Top 10 Current Scoreboard </h2>
        {scoreBoardDisplay}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div>
          <button style={startNewGame} onClick={()=> this.props.navigate('home')}> Start New Game! </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </MuiThemeProvider>

    );
  }
}

class ScoreBoardEntry extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div style= {individualScoreEntry} >
        <strong> {this.props.chapter} : {this.props.points} </strong>
      </div>
    );
  }
}
