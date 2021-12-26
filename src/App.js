import React, { Component } from "react";
// import audio from './beep.mp3';

//this is for test only
const sound = document.getElementById("beep");


export default class App extends Component {
    constructor(props) {

        super(props);

        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timerState: 'Stopped',
            timerType: 'Session',
            timeLeft: 1500,
            temp: undefined
        };
        this.setBreakLength = this.setBreakLength.bind(this);
        this.setSessionLength = this.setSessionLength.bind(this);
        this.reset = this.reset.bind(this);
        this.formateTime = this.formateTime.bind(this);
        this.startStop = this.startStop.bind(this);

    }
    setBreakLength(e) {
        //if timer is running then it should not update the break-length
        if (this.state.timerState == "Running") return;
        //if user pressed minus then break length not able to update less than 1
        if (e.currentTarget.value == "minus") {
            if (this.state.breakLength <= 1) return;
            this.setState({ breakLength: this.state.breakLength - 1 });
        } 
        //if user pressed plus then break length not able to update grater than 60 
        else if (e.currentTarget.value == "plus") {
            if (this.state.breakLength >= 60) return;
            this.setState({ breakLength: this.state.breakLength + 1 });
        }
    }
    setSessionLength(e) {
        //if timer is running it should not update the session-length
        if (this.state.timerState == "Running") return;
        //if user pressed minus it should not update less than 1 minute
        if (e.currentTarget.value == "minus") {
            if (this.state.sessionLength <= 1) return;
            this.setState({
                sessionLength: this.state.sessionLength - 1,
                timeLeft: this.state.timeLeft - 60
            });
        }
        //if user pressed plus than it should not updated grater than 60 minute
         else if (e.currentTarget.value == "plus") {
            if (this.state.sessionLength >= 60) return;
            this.setState({
                sessionLength: this.state.sessionLength + 1,
                timeLeft: this.state.timeLeft + 60
            });
        }
    }

    startStop = () => {
        //if timer is running than it should stop the timer
        if (this.state.timerState == "Running") {

            this.setState({ timerState: "Stopped" });
            clearInterval(this.state.temp);

        } 
        //if timer is not running than it should start the timer when user pressed the button
        else {
            this.setState({
                timerState: "Running",
                temp: setInterval(() => {
                    //for not typing this.state
                    // const { timeLeft,timerType,breakLength,sessionLength} = this.state;
                    //if timer reaches zero then it should swap the label and play the sound
                    if (this.state.timeLeft === 0) {
                        this.setState({
                            timerType: (this.state.timerType === "Session") ? "Break" : "Session",
                            timeLeft: (this.state.timerType === "Session") ?
                                (this.state.breakLength * 60) : (this.state.sessionLength * 60)
                        });

                        sound.currentTime = 0;   
                        sound.play();

                    } 
                    //if nothing above is true than it should continue to decrease 
                    else {
                        this.setState({
                            timeLeft: (this.state.timeLeft - 1)
                        });
                    }

                }
                    , 1000)
            });
        }
    }
    //this will unmount the temp interval
    componentWillUnmount() {
        clearInterval(this.state.temp);
    }


//reset everything
    reset() {
        this.setState({
            breakLength: 5,
            sessionLength: 25,
            timerState: 'Stopped',
            timerType: 'Session',
            timeLeft: 1500
        });
        clearInterval(this.state.temp);
        sound.currentTime = 0;
        sound.pause();
    }

    //this formate time in mm:ss 
    formateTime() {
        let minutes = Math.floor(this.state.timeLeft / 60);
        let seconds = this.state.timeLeft - minutes * 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ':' + seconds;
    }

    render() {
        return (
            <div id="container">
                <h1>Pomodoro Clock</h1>
                <br />
                <div className="length-control">
                    <p id="break-label">Break Length</p>
                    <button id="break-decrement"
                        onClick={this.setBreakLength}
                        value="minus"
                        className="length-items">
                        -
                    </button>
                    <div id="break-length" className="length-items">{this.state.breakLength}</div>
                    <button id="break-increment"
                        onClick={this.setBreakLength}
                        value="plus"
                        className="length-items">
                        +
                    </button>
                </div>

                <div className="length-control">
                    <p id="session-label" >Session Length</p>
                    <button id="session-decrement"
                        onClick={this.setSessionLength}
                        value="minus"
                        className="length-items">
                        -</button>
                    <div id="session-length" className="length-items">{this.state.sessionLength}</div>
                    <button id="session-increment"
                        onClick={this.setSessionLength}
                        value="plus"
                        className="length-items">
                        +</button>
                </div>
                <br />
                <div>

                    <div id="timer-contain">
                        <p id="timer-label">{this.state.timerType}</p>
                        {this.state.timerState}
                        <p id="time-left">{this.formateTime()}</p>
                    </div>


                    <button id="start_stop"
                        onClick={this.startStop}>
                        start/stop
                    </button>
                    <button id="reset"
                        onClick={this.reset}>
                        reset
                    </button>
                </div>
            </div>
        )
    }
}