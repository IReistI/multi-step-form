import { Step1, Step2, Step3 } from "../types"

export type stepActions = {
    type: "UPDATE-STEP-1",
    payload: Step1
} | {
    type: "UPDATE-STEP-2",
    payload: Step2
} | {
    type: "UPDATE-STEP-3",
    payload: Step3
} | {
    type: "UPDATE-TYPE",
    payload: string
} | {
    type: "UPDATE-STEP-3-WITH-NEW-VALUES",
    payload: Step3[]
} | {
    type: "SET-OPTION",
    payload: string
} | {
    type: 'UPDATE-ALL-WITH-NEW-VALUES'
}

export type StepState = {
    stepForm_1: Step1
    stepForm_2: Step2
    stepForm_3: Step3[]
    currentStep: number
    type: string
}

export const initialState : StepState = {
    stepForm_1: {
        name: "",
        email: "",
        phone: "",
    },
    stepForm_2: {
        option: "",
        billing: 0,
    },
    stepForm_3: [],
    currentStep: 1,
    type: "Monthly"
}

export const stepReducer = (
    state: StepState = initialState,
    action: stepActions,
) => {
    if(action.type === 'UPDATE-STEP-1') {
        return {
            ...state,
            stepForm_1: {
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone
            }
        }
    }
    if(action.type === 'UPDATE-STEP-2') {
        return {
            ...state,
            stepForm_2: action.payload
        }
    }
    if(action.type === 'UPDATE-STEP-3') {
        let exists = action.payload.isRemove
        return {
            ...state,
            stepForm_3: exists 
                            ? state.stepForm_3.filter(option => option.name !== action.payload.name) 
                            : [...state.stepForm_3, action.payload]
        }
    }
    if(action.type === 'UPDATE-TYPE') {
        return {
            ...state,
            type: action.payload
        }
    }
    if(action.type === 'UPDATE-STEP-3-WITH-NEW-VALUES') {
        return {
            ...state,
            stepForm_3: action.payload
        }
    }
    if(action.type === 'SET-OPTION') {
        return {
            ...state,
            stepForm_2: {
                ...state.stepForm_2,
                option: action.payload
            }
        }
    }
    if (action.type === 'UPDATE-ALL-WITH-NEW-VALUES') {
        const valuesMap: { [key: string]: { Monthly: number, Yearly: number } } = {
            arcade: { Monthly: 9, Yearly: 90 },
            advanced: { Monthly: 12, Yearly: 120 },
            pro: { Monthly: 15, Yearly: 150 }
        };

        const addonsValuesMap: { [key: string]: { Monthly: number, Yearly: number } } = {
            service: { Monthly: 1, Yearly: 10 },
            storage: { Monthly: 2, Yearly: 20 },
            profile: { Monthly: 2, Yearly: 20 }
        };

        const newValueStep2 = valuesMap[state.stepForm_2.option]?.[state.type as "Monthly" | "Yearly"] || 0;

        const newStepForm3 = state.stepForm_3.map(addOn => {
            const addOnName = addOn.name as keyof typeof addonsValuesMap;
            return {
                ...addOn,
                value: addonsValuesMap[addOnName]?.[state.type as "Monthly" | "Yearly"] || addOn.value
            };
        });

        return {
            ...state,
            stepForm_2: {
                ...state.stepForm_2,
                billing: newValueStep2
            },
            stepForm_3: newStepForm3
        };
    }
    return state
}