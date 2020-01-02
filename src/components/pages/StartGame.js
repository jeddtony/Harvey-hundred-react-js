import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import Card from '../units/Card';
import HomeScreen from '../units/HomeScreen';
import Chronograph from '../units/chronograph/Chronograph';
import moment from 'moment';

import {RoundButton} from '../units/Buttons';
// import Modal from 'react-modal';
import Modal from '../units/Modal';
import BasicTextFields, {CustomTextField} from '../units/FormInput';
import CreateGame from '../units/startgame/CreateGame';
import PlayersList from '../units/startgame/PlayersList';

import {usePlayerState} from '../../context/GameContext';


export default function StartGame () {
    // const uniqueCards = ['pig','fish','cactus','corn','shroom'];
    const uniqueCards = ['pig','fish','cactus','corn']
    const numCardsToMatch = 2;

    const [cards, setCards] = useState([]);
    const [gameOver, setGameOver] = useState(1);
    const [gamesWon, setGamesWon] = useState(0);

    // const [players, setPlayers] = useState([]);
    const {players} = usePlayerState();
    const[selectedCards, setSelectedCards] = useState([]);
    
    const [ignoreCardClicks, setIgnoreCardClicks] = useState(false);
    const [timeStarted, setTimeStarted] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    let cardIndex = 0

    useEffect(() => {
        
        
        setCards(shuffleCards());
        return () => {
            return false;
        };
    }, []);


    const closeModal = () => {
      setModalIsOpen(false);
    }

    const shuffleCards = (disappear = false) => {

        let multipliedCards = multiplyCards(uniqueCards, numCardsToMatch);
        let shuffled = _.shuffle(multipliedCards);

        let cards = shuffled.map(val => ({type: val, position: 'unselected'}))

        setCards(cards);
        if(disappear){
        setGameOver(0);
        setTimeStarted(moment().add(30, 's'))
    }
        return cards;
    }

    const multiplyCards = (cards, multiplier) => {
        // let loopTimes = multiplier - 1;
        let loopTimes = 3
        let multiplied = cards;
        for (let i = 0; i < loopTimes; i++){
          multiplied = _.concat(multiplied,cards);
    }
    return multiplied;
    }

    const pickCard = (index)=> {

        if(!ignoreCardClicks) {
            let curSelectedCards = _.concat(selectedCards, index);
            let curCards = cards;

            curCards[curSelectedCards[curSelectedCards.length -1 ]].position = "selected";

            if(curSelectedCards.length === numCardsToMatch) {
                setCards(curCards);

                // I ignored _this = this 

                setIgnoreCardClicks (true);

                let pauseGame = setTimeout(()=> {
                    curCards = checkForMatch(curCards, curSelectedCards);
                    curSelectedCards = [];

                    setIgnoreCardClicks(false);
                    setSelectedCards(curSelectedCards);
                    setCards(curCards);

                }, 750)
            } else {

                curCards[curSelectedCards[0]].position = "selected";
                setSelectedCards(curSelectedCards);
                setCards(curCards);
            }
        }
    }

    const checkForMatch = (curCards, curSelectedCards ) => {
        //2 cards selected... check for match
        if (selectedHasSameAttribute (curCards, curSelectedCards, 'type')) {
            curCards = changeAllPositionsOfSelected(curCards,curSelectedCards,"removed");

            let winTest =  _.reduce(curCards, function(result, value, key) {

               
                if(result === value.position){
                  return result;
                }else{
                  return false;
                }
               //return true;
                
              }, curCards[0].position); 
              
             //console.log('WINTEST='+winTest);
             if(winTest !== false){
               addWin();
             }
             
            }else{
              curCards = changeAllPositionsOfSelected(curCards,curSelectedCards,"unselected");
            }
          
            //only curCards is transformed
            return curCards;
        }
    
       const addWin = () => {
            let newGamesWon = gamesWon + 1;
            // this.setState({ gamesWon: newGamesWon, gameOver: 1 });

            setGamesWon(newGamesWon);
            setGameOver(1);
          }

   const selectedHasSameAttribute = (allCards,selectedCards,attribute)=>{
        //console.log('hasSameAttribute '+attribute);
        let eq = allCards[selectedCards[0]][attribute];
        for (let v of selectedCards) {
          if(allCards[v][attribute] !== eq){ return false; }
        }
        return true;
      }

    const changeAllPositionsOfSelected = (allCards,selectedCards,newPosition) => {
      for (let v of selectedCards) {
        allCards[v].position=newPosition;
      }
      return allCards;
    }

    return (
        <div className="memory-app">
           <HomeScreen gameOver={gameOver} gamesWon={gamesWon} clickEvent={shuffleCards} />  
           <div className="main">
             <div className="cards">
 
           {cards.map((thisCard, index)=> {
              return (
              <Card key={index} index={cardIndex++} clickEvent={pickCard} position={thisCard.position} type={thisCard.type}/> 
              )
    
          
            })}
       </div> 

<div className="game-details">
  <RoundButton variant="outlined" color="white" label="Create Game" onClick={()=>setModalIsOpen(true)}/>
<Chronograph timeUp={setGameOver} gameOver={gameOver} timeStarted={timeStarted}/>
            {(players.length > 0)? (
              <PlayersList players={players || []} />
            ): ('')}
            
</div>

{/* The Create Game Modal */}
<Modal
          open={modalIsOpen}
          // onAfterOpen={this.afterOpenModal}
          closeModal={closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
 
          <CreateGame   closeModal={closeModal}/>
        </Modal>
</div>

         </div> 
    )
 
}