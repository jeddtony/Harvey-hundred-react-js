import React, {useState, useEffect} from 'react';

import _ from 'lodash';
import Card from './components/Card';
import HomeScreen from './components/HomeScreen';

export default function App () {
    const uniqueCards = ['pig','fish','cactus','corn','shroom'];
    const numCardsToMatch = 2;

    const [cards, setCards] = useState([]);
    const [gameOver, setGameOver] = useState(1);
    const [gamesWon, setGamesWon] = useState(0);

    const [showHome, setShowHome] = useState(false);
    const[selectedCards, setSelectedCards] = useState([]);
    
    const [ignoreCardClicks, setIgnoreCardClicks] = useState(false);

    let cardIndex = 0

    useEffect(() => {
        
        
        setCards(shuffleCards());
        return () => {
            return false;
        };
    }, []);


    const shuffleCards = (disappear = false) => {

        let multipliedCards = multiplyCards(uniqueCards, numCardsToMatch);
        let shuffled = _.shuffle(multipliedCards);

        let cards = shuffled.map(val => ({type: val, position: 'unselected'}))

        setCards(cards);
        if(disappear){
        setGameOver(0);
    }
        return cards;
    }

    const multiplyCards = (cards, multiplier) => {
        let loopTimes = multiplier - 1;
        let multiplied = cards;
        for (var i = 0; i < loopTimes; i++){
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
                //console.log('value.position='+value.position);
                //console.log('result='+result);
               
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
<div className="cards">
           {cards.map(function(thisCard) {
            return <Card index={cardIndex++} clickEvent={pickCard} position={thisCard.position} type={thisCard.type}/>
            })}
       </div> 

        </div>
    )
 
}