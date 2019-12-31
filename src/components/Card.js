import React from 'react'

export default function Card(props) {

    const clickMe = () => {
    
        if(String(props.position) === 'unselected') {
            props.clickEvent(props.index);
        } else {
            console.log('cant click me! my position is '+props.position);
        }
    }
    return (
        <div data-index={props.index} data-cardtype={props.type} onClick={clickMe } className={ 'card card--'+props.type+' card--'+props.position } > 
        <div className="card__inner"> 
            <div className="card__face card__front" style={{textAlign: "center"}}> 
              <h1 style={{color: "white"}}>{props.index + 1}</h1>
            </div> 
            <div className="card__face card__back"> 
               
            </div> 
        </div> 
    </div> 
    )
}
