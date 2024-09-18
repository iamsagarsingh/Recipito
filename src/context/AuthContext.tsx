import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

interface DefaultStateTypes {
    status: boolean,
    userData : null | {
        $id:string,
        name:string,
        email:string   
    }
}

interface ContextType{
    state: DefaultStateTypes,
    dispatch: Dispatch<ActionType>
}

interface ActionType {
    type: string,
    payload: {
        $id:string,
        name:string,
        email:string   
    } | null
}


const authContext = createContext({} as ContextType)

const reducer = (state:DefaultStateTypes,action:ActionType) : DefaultStateTypes => {
    if(action.type === "LOGIN"){
        return {
            ...state,
            status: true,
            userData: action.payload
        }
    }
    else if(action.type === "LOGOUT"){
        return {
            ...state,
            status: false,
            userData: null
        }
    }
    return state
}

const defaultState: DefaultStateTypes = {
    status: false,
    userData : null
}

export function AuthContextProvider({children}:{children:ReactNode}){
    const [state,dispatch] = useReducer(reducer,defaultState)
    return <authContext.Provider value={{state,dispatch}}>
        {children}
    </authContext.Provider>
}

export function useAuth(){
    return useContext(authContext)
}