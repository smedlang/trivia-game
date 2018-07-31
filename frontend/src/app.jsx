import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game'

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      currentPage: 'game'
    };
  }

  navigate(page){
    this.setState({
      currentPage: page
    })
  }

  render() {
    return (
      <div>
        {this.state.currentPage === 'game'?
          <Game navigate={this.navigate} /> : null }
        {this.state.currentPage === 'scoreboard'?
          <Scoreboard navigate={this.navigate}/> : null }

      </div>);
  }
}
