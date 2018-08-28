
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton'

var stylesheet = require('./stylesheet.js').stylesheet;

var question = stylesheet.question;
var answerChoice = stylesheet.answerChoice;
var startGameButton = stylesheet.startGameButton
var questionBank = require('./questions.js').questions;



export default class Game extends Component{
  constructor(props){
    super(props);

    // this.socket = io('http://localhost:1337/')
    this.state = {
      points: 0,
      questionNumber: 0,
      questions: questionBank,
      time: {},
      seconds: 90
    },
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  next(){
    this.setState({
      questionNumber: this.state.questionNumber + 1
    })
  }
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0 || this.state.questionNumber >= this.state.questions.length) {
      clearInterval(this.timer);
      this.props.endGame(this.state.points);
    }
  }

  addPoint(){
    let points = this.state.points;
    this.setState({
      points: points+1
    })
  }

  render(){

    return(

      <div style={{backgroundColor: '#258E1E', textAlign: 'center'}}>
        {this.state.seconds === 90 ? this.startTimer() : null}
        <h1> {this.props.name}</h1>
        <h1> {this.props.chapter}</h1>
        <h2 style ={{color: 'red'}}> <strong> TIMER: {this.state.time.m}: {this.state.time.s} </strong> </h2>

        <br />
        <br />

        {this.state.questionNumber < this.state.questions.length?

        <Question
          addPoint={this.addPoint.bind(this)}
          questionNumber={this.state.questionNumber}
          correctAnswerLetter={this.state.questions[this.state.questionNumber].correctAnswerLetter}
          question={this.state.questions[this.state.questionNumber].question}
          a={this.state.questions[this.state.questionNumber].a}
          b={this.state.questions[this.state.questionNumber].b}
          c={this.state.questions[this.state.questionNumber].c}
          d={this.state.questions[this.state.questionNumber].d}
          next = {this.next.bind(this)}/> :
        this.props.endGame(this.state.points)}

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <br />
        <br />


    </div>
    );
  }
}

class Question extends Component {
  constructor(props){
    super(props);
  }

  handleClick(answer){
    if (answer === this.props.correctAnswerLetter){
      this.props.addPoint();
      this.props.next();
    }else{
      this.props.next();
    }

  }

  render(){
    return (
      <MuiThemeProvider>
      <div>
          <h2 style ={{color: 'white'}}> Question {this.props.questionNumber + 1}: {this.props.question} </h2>
          <br />
          <br />
          <br />
          <br />
          <button style={answerChoice} onClick={()=> this.handleClick('a')}> A: {this.props.a} </button> <br />
          <button style={answerChoice} onClick={()=> this.handleClick('b')}> B: {this.props.b} </button> <br />
          <button style={answerChoice} onClick={()=> this.handleClick('c')}> C: {this.props.c} </button> <br />
          <button style={answerChoice} onClick={()=> this.handleClick('d')}> D: {this.props.d} </button> <br />

      </div>
    </MuiThemeProvider>


    );

  }
}
