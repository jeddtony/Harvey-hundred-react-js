import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import {useForm} from 'react-hook-form';
import {usePlayerDispatch} from '../../../context/GameContext';


const useStyles = makeStyles(theme => ({

  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

export default function CreateGame({ closeModal}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const dispatch = usePlayerDispatch();
  
  const classes = useStyles();



  const populateFields = (numberOfPlayers) => {
    let fieldArray = [];
    for(let i = 0; i < numberOfPlayers; i++) {
      fieldArray.push(
        <>
      <TextField name={`playersName${i}`} key={i} label="Number of players" 
      variant="outlined" inputRef={register({required: true})} /> 
      <br />
      </>)
    }
    return fieldArray
  }


  const submitForm = (data) => {

    console.log('this is the data ', data);
    let tempStateHolder = [];
    for(let i = 0; i < numberOfPlayers; i++) {
      console.log('this is the playersName', data[`playersName${i}`])
      // setplayers([...players, {'name' : data[`playersName${i}`]}]);
      tempStateHolder.push({'name' : data[`playersName${i}`]})
    }

    dispatch({players: tempStateHolder});
    closeModal(false);
    
  }


  return (
    <>
      {numberOfPlayers? (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(submitForm)}>
          {populateFields(numberOfPlayers)}
        
          <Button type="submit" variant="contained" color="primary">
  Create Game
</Button>
  </form>
      ) : (
        <NumberOfPlayers  setNumberOfPlayers={setNumberOfPlayers}/>
      )}
    
</>

  );
}




const NumberOfPlayers = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();
  
  const submitForm = (data) => {

    props.setNumberOfPlayers(data.numOfPlayers);


  }
  return (
    <>
    <form onSubmit={handleSubmit(submitForm)}>
    
    <TextField id="outlined-basic" label="Number of players" variant="outlined" 
      type="number" name="numOfPlayers" inputRef={register({required: true})} />
    {errors.numOfPlayers && <ErrorMessage />}

    <Button type="submit" variant="contained" color="primary">
  Submit
</Button>
</form>
</>
  )
}

const ErrorMessage = () => {
  return (
    <span>This field is required</span>
  )
}