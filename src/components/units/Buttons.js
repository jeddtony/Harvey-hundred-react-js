import React from 'react';
import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';

const white = grey[50];

const whiteOutline = {
    color: 'white',
    border: '3px solid'
}

export const RoundButton = (props) => {
    return (
       <Button variant={props.variant} style={whiteOutline} onClick={props.onClick}>
           {props.label}
       </Button>
    )
}