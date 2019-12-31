import React, { useState, useEffect } from 'react';
import './Chronograph.scss';
import moment from 'moment';

export default function Chronograph(props) {

    const one_second = 1000
        , one_minute = one_second * 60
        , one_hour = one_minute * 60
        , one_day = one_hour * 24
    //   , startDate = new Date();

    const [endDate, setEndDate] = useState(moment().add(30, 's'));
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [nowDate, setNowDate] = useState(new Date());

    // const endTime = moment().subtract(2, m);

    useEffect(() => {
        tick();
        return () => {
            return false
        };
    }, [])
    const requestAnimationFrame = (function () {
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
       
        let elapsed = endDate - now;
        if(now <= endDate  ) {

        let tempHours = ('' + Math.floor(elapsed / one_hour));
        let tempMinutes = ('' + Math.floor((elapsed % one_hour) / one_minute));
        let tempSeconds = ('' + Math.floor(((elapsed % one_hour) % one_minute) / one_second));

        setHours((tempHours.length === 1) ? '0' + tempHours : tempHours)
        setMinutes((tempMinutes.length === 1) ? '0' + tempMinutes : tempMinutes);
        setSeconds((tempSeconds.length === 1) ? '0' + tempSeconds : tempSeconds);

        
       return requestAnimationFrame(tick);
        }
        props.timeUp(1);
    
      
    }

    // const padNumbers = (callbackFunction, state) => {
    //     callbackFunction((String(state).length === 1) ? '0' + state : state);
    // }
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
            <div className="timer second">
                <div className="hand"><span></span></div>
                <div className="hand"><span></span></div>
            </div>
            <div className="face">
                <h2>Countdown </h2>
                {/* <p id="lazy">00:00:00</p>   */}
                <p id="lazy">{hours}:{minutes}:{seconds}</p>
            </div>
        </div>
    )
}
