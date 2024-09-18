import { ActionType, DefaultStateTypes } from "@/context/AuthContext";
import { useEffect, useReducer } from "react";

export function useLocalStorage(key:string,reducer:React.Reducer<DefaultStateTypes,ActionType>,defaultState:DefaultStateTypes){
    const [state,dispatch] = useReducer(reducer,defaultState,(initalState)=>{
        const jsonData = localStorage.getItem(key)
        if(jsonData !== null) return JSON.parse(jsonData)
        else{
            return initalState
        }
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state])

    return [state,dispatch] as const
}