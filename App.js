import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils';



function leftPadding(n) {
  if (parseInt(n) < 10) {
    return "0" + n.toString();
  } else {
    return n.toString();
  }
}


export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      workTime: '00:30',
      breakTime: '05:00',
      currentTime: '00:30',
      playing: false,
      stopped: false,
      working: true,
      timer: null
    }
    this.startBtn = this.startBtn.bind(this);
    this.stopBtn = this.stopBtn.bind(this);
    this.resetBtn = this.resetBtn.bind(this);
    this.countdown = this.countdown.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  startBtn(){
    if(this.state.playing === false || this.state.stopped === true){
      this.setState({
        timer: setInterval(this.countdown, 1000),
        stopped: false,
        playing: true
      })
    }
  }

  stopBtn(){
    if(this.state.playing === true || this.state.stopped === false){
      clearInterval(this.state.timer)
      this.setState({
          stopped: true,
          playing: false,
          timer: null
      })
    } else if(this.state.playing === false || this.state.stopped === true){
      clearInterval(this.state.timer)
      this.startBtn()
    }
  }
  
resetBtn(){
  this.stopBtn()
  clearInterval(this.state.timer)
  this.setState({
    timer: null,
    playing: false,
    stopped: false,
    working: true,
    currentTime: this.state.workTime
  })
}

countdown(){
  if(this.state.currentTime === '00:00' && this.state.playing === true){
      vibrate()
      this.changeStatus()
  } else{
    let minutes = this.state.currentTime.slice(0,2)
    let seconds = this.state.currentTime.slice(3)
    if(seconds === '00'){
      let newMin = leftPadding(parseInt(minutes) - 1)
      let updateTime = newMin + ":59"
      this.setState({
        currentTime: updateTime
      })
    } else{
      let newSec  = leftPadding((parseInt(seconds) - 1))
      let updateTime = minutes + ":" + newSec
      this.setState({
        currentTime: updateTime
      })
    }
  }
}

changeStatus(){
  if(this.state.working){
      this.setState({
        currentTime: this.state.breakTime,
        working: false
      })
  } else{
    this.setState({
      currentTime: this.state.workTime,
      working: true
    })
  }
}


  render() {
    return ( 
      <View style={styles.container}>
              <Text style={styles.title}>{this.state.working ? "Work Time" : "Break Time"}</Text>
              <Text style={styles.count}>{this.state.currentTime}</Text>
              <View style={styles.btnRow}>
                  <View style={[styles.btn, styles.btnStart]}>
                      <Button color="#fff" title="Start" onPress={this.startBtn}/>
                  </View>
                  <View style={[styles.btn, styles.btnStop]}>
                      <Button color="#fff" title="Stop" onPress={this.stopBtn}/>
                  </View>  
                  <View style={[styles.btn, styles.btnReset]}>
                      <Button color="#fff" title="Reset" onPress={this.resetBtn}/>
                  </View>
              </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  count:{
    fontSize: 60,
    marginBottom: 50
  },
  title:{
    fontSize: 50,
    marginBottom: 50
  },
  btn:{
    backgroundColor: '#198cff',
    borderRadius: 100,
    marginBottom:10,
    marginRight: 10,
    width: 90,
    height: 90,
    justifyContent: 'center'
  },
  btnRow:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnReset:{
    backgroundColor: '#ffae42',
  },
  btnStart:{
    backgroundColor:'#22bb33'
  },
  btnStop:{
    backgroundColor:'#bb2124'
  }
});
