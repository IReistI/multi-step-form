import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { initialState, stepActions, stepReducer, StepState } from "../reducer/step-reducer";

type StepContextProvider = {
    state: StepState,
    dispatch: Dispatch<stepActions>
    calculateTotalAmount: (billing: number, value: number) => number
    formatPaymentType: (type: string, value: number) => string
}

type StepContextProps = {
    children: ReactNode
}

export const StepContext = createContext<StepContextProvider>(null!)

export const StepProvider = ({children} : StepContextProps) => {
    const [state, dispatch] = useReducer(stepReducer, initialState)
    
    const calculateTotalAmount = (billing: number, value: number) => {
        let totalAmount = billing + value   
        return totalAmount
    }

    const formatPaymentType = (paymentFrequency: string, value: number) => {
        if (paymentFrequency === 'Monthly') {
            return `${value}/mo`
        }
        return `${value}/yr`
    }

    return (
        <StepContext.Provider
            value={{
                state,
                dispatch,
                calculateTotalAmount,
                formatPaymentType
            }}
        >
            {children}
        </StepContext.Provider>
    )
}