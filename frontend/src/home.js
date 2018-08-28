import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-flexbox-grid';

var stylesheet = require('./stylesheet.js').stylesheet;

var chooseChapter = stylesheet.chooseChapter;
var notInGreekLifeButton = stylesheet.notInGreekLifeButton;
var startGameButton = stylesheet.startGameButton


const frats = ['None', 'Beta Theta Pi', 'Delta Chi', 'Delta Sigma Phi', 'Delta Tau Delta', 'Delta Upsilon', 'Phi Delta Theta',
'Phi Gamma Delta', 'Phi Kappa Psi', 'Phi Kappa Tau', 'Phi Kappa Theta', 'Pi Kappa Phi', 'Sigma Alpha Epsilon', 'Sigma Chi',
'Sigma Nu', 'Theta Chi', 'Zeta Beta Tau', 'Zeta Psi'];

const sororities = ['Alpha Chi Omega', 'Alpha Gamma Delta', 'Alpha Phi', 'Delta Gamma', 'Kappa Alpha Theta', 'Phi Mu', 'Phi Sigma Rho', 'Pi Beta Phi',
'Sigma Psi', 'Sigma Sigma Sigma'];

export default class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      name: '',
      chapter: '',
      alertMessage: ''
    }
  }

  handleChange(e){
    this.setState({
      name: e.target.value
    })
  }

  setChapter(chapter){
    this.setState({chapter: chapter});
  }

  startGame(){
    if (this.state.name && this.state.chapter){
      this.props.startGame(this.state.name, this.state.chapter);
    }else{
      this.setState({
        alertMessage: 'You must enter your name and select your chapter!'
      });
    }
  }

  render(){
    return (
      <MuiThemeProvider >

      <div style={{textAlign: 'center', backgroundColor: '#258E1E'}}>

        <h1>Welcome to Alpha Phi's Banner Trivia!</h1>
        <button

          style = {startGameButton}
          onClick={()=> this.startGame()}> START GAME </button>


        <h3 style={{color: 'red'}}> {this.state.alertMessage} </h3>
          <TextField
            hintText="Your name"
            errorText="This field is required"
            onChange={(e)=> this.handleChange(e)}/>

        <h3 style={{color: 'white'}}> Your Chapter: {this.state.chapter}</h3>
        <Row center="xs">
          <Col style={{display: 'inlineBlock', padding: '20px'}}>
            {frats.map((chapter)=> {
              return (<div ><button onClick={()=> this.setChapter(chapter)} style={chooseChapter}> <strong> {chapter}  </strong> </button><br/></div>);
            })}
          </Col>
          <Col style={{'padding': 20}}>
            {sororities.map((chapter)=>
              (<div><button onClick={()=> this.setChapter(chapter)} style={chooseChapter}> <strong> {chapter} </strong> </button><br/></div>)
            )}
          </Col>
        </Row>


      </div>
      </MuiThemeProvider>
    );

  }
}
