import React, { useState, useEffect } from 'react';
import './Chronograph.scss';
import moment from 'moment';

export default function Chronograph(props) {

    const one_second = 1000
        , one_minute = one_second * 60
        , one_hour = one_minute * 60


    const [showAnimation, setShowAnimation] = useState(false);
    const [seconds, setSeconds] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [hours, setHours] = useState('0');


    useEffect(() => {
        setHours((hours.length === 1) ? '0' + hours : hours)
        setMinutes((minutes.length === 1) ? '0' + minutes : minutes);
        setSeconds((seconds.length === 1) ? '0' + seconds : seconds);

       
        if(!props.gameOver){
            
            setShowAnimation(true)
        tick();
    }

        return () => {
            return false
        };
    }, [props.gameOver])


    const requestAnimationFrame = (function () {
        // console.log('the end date is ', endDate)
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    }());

    const tick = () => {
      let now = moment();
        // setNowDate(new Date())
       
        let elapsed = props.timeStarted - now;
        if(now <= props.timeStarted  ) {

        let tempHours = ('' + Math.floor(elapsed / one_hour));
        let tempMinutes = ('' + Math.floor((elapsed % one_hour) / one_minute));
        let tempSeconds = ('' + Math.floor(((elapsed % one_hour) % one_minute) / one_second));

        setHours((tempHours.length === 1) ? '0' + tempHours : tempHours)
        setMinutes((tempMinutes.length === 1) ? '0' + tempMinutes : tempMinutes);
        setSeconds((tempSeconds.length === 1) ? '0' + tempSeconds : tempSeconds);

        
       return requestAnimationFrame(tick);

        }
        // props.timeUp(1);
        setShowAnimation(false)
    
      
    }

    return (
        <div className="timer-group">
            {/* <div className="timer hour">
                <div className="hand"><span></span></div>
                <div className="hand"><span></span></div>
            </div> */}
            {/* <div className="timer minute">
                <div className="hand"><span></span></div>
                <div className="hand"><span></span></div>
            </div> */}
            {showAnimation? (
                <div className="timer second">
                <div className="hand"><span></span></div>
                <div className="hand"><span></span></div>
                </div>
            ) : ('')}
            
            <div className="face">
                <h2>Countdown </h2>
                {/* <p id="lazy">00:00:00</p>   */}
                <p id="lazy">{hours}:{minutes}:{seconds}</p>
            </div>
        </div>
    )
}
