import React, {createContext, useReducer, useContext} from 'react';


const PlayersStateContext = createContext();
const PlayersDispatchContext = createContext();

function playerReducer (state, action) {
    // switch (action.type) {
    //     case 'add'
    // }
    
    return {players: action.players}
}

function PlayerProvider ({children}) {
    const [state, dispatch] = useReducer(playerReducer, {players: []});
    return (
        <PlayersStateContext.Provider value={state} >
            <PlayersDispatchContext.Provider value={dispatch}>
                {children}
            </PlayersDispatchContext.Provider>
        </PlayersStateContext.Provider>
    )
}

function usePlayerState () {
    const context = useContext(PlayersStateContext);

    if(context === undefined) {
        throw new Error('usePlayerState must be used within a content provider');
    }

    return context;
}

function usePlayerDispatch () {
     const context = useContext(PlayersDispatchContext);
     if(context === undefined) {
         throw new Error ('usePlayerDispatch must be used within a content provider')
     }

     return context;
}

export {PlayerProvider, usePlayerDispatch, usePlayerState};