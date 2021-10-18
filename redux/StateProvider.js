import {createContext, useContext, useReducer} from 'react'


const StateContext = createContext()


export default function StateProvider({children, reducer, initialState}){
    return(
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)