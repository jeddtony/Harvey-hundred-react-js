import React, {useState, useEffect} from 'react';
import {PlayerProvider, usePlayerDispatch, usePlayerState} from './context/GameContext';
import StartGame from './components/pages/StartGame'


export default function App () {
    return (
      <PlayerProvider>
      <StartGame /> 
      </PlayerProvider>
    )
 
}