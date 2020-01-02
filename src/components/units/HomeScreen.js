import React from 'react';


export default function HomeScreen(props) {

    const clickMe = () => {
        props.clickEvent(props.clickEvent);
    }
    return (
        <div className={props.gameOver ? "homescreen homescreen--visible" : "homescreen homescreen--hidden"}>
        <div className="homescreen__box">
          <h1 className="homescreen__title">Harvey &nbsp;  Hundreds</h1>
          <div className="homescreen__stats">
            Games Won: <strong className="homescreen__number" >{props.gamesWon}</strong>
          </div>
          <button className="homescreen__shuffle-button " onClick={clickMe} >Start!</button>
       </div>
      </div>
    )
}
