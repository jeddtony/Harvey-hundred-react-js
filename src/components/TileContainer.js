import React from 'react'


export default function Container(props) {

    return (
        <div className="tile_container">
            {props.children}
        </div>
    )
}
