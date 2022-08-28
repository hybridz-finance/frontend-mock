
import React from "react"
import { reducer, initialState } from "./reducer"

export const UserContext:any = React.createContext({
  state: initialState,
  dispatch: () => null
})

export const UserProvider = ({ children }:any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <UserContext.Provider value ={[ state, dispatch ]}>
    	{ children }
    </UserContext.Provider>
  )
}