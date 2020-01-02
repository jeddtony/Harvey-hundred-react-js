import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
});

export default function PlayersList({players} = []) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        
        <CardContent>
            {players.map( player=> (<Typography gutterBottom variant="h5" component="h2">
            {player.name}
          </Typography>))}
          
          
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}