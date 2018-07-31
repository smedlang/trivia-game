import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client'


export default class Game extends React.Component{
  constructor(props){
    super(props);

    this.socket=io('http://localhost:1337/')
    this.state = {
      name: '',
      status: ''
    }
  }

  onChangeName(e){
    this.setState({
      name: e.target.value
    })
  }

  onReady(){
    this.setState({
      status: 'waiting'
    }, ()=> {
      this.socket.on('connect', () => {
        this.socket.on('waitingForAnotherPlayer', ()=> {
          console.log('waiting');
        })
      })
    })

  }

  componentWillUnmount(){
    this.state.socket.emit('close');
  }

  render(){
    return (
      <div>
        Game Page
        {this.state.status === 'waiting'? <h1>Waiting for another player </h1> : null}
        <input
          type="text"
          placeholder="your name"
          onChange={(e)=> this.onChangeName(e)}
        />
        <button
          onClick={()=> this.onReady()}> Ready! </button>

      </div>
    );
  }


}
