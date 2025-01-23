import { useStep } from "../hooks/useStep"
import { MouseEvent } from "react"

export default function ToggleSwitch() {
  const {state, dispatch} = useStep()
  
  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()

    if (e.currentTarget.textContent === state.type) return
    
    if (state.type === 'Monthly') {
      dispatch({type: 'UPDATE-TYPE', payload: 'Yearly'})
    } else {
      dispatch({type: 'UPDATE-TYPE', payload: 'Monthly'})
    }
  }

  return (
    <div className="flex gap-4 bg-neutral-alabaster py-4 px-4 rounded-lg justify-center 1xl:mt-8">
      <button 
        className={`font-bold ${state.type === "Monthly" ? "text-primary-marine-blue" : "text-neutral-cool-gray hover:text-neutral-light-gray transition-all"}`}
        onClick={(e) => handleClick(e)}
      >
        Monthly
      </button>
      <button 
        className={`toggle-switch ${state.type === "Monthly" ? "" : "toggled"}`} 
        onClick={(e) => handleClick(e)}  
      >
        <div className="thumb"></div>
      </button>
      <button 
        className={`font-bold ${state.type === "Yearly" ? "text-primary-marine-blue" : "text-neutral-cool-gray hover:text-neutral-light-gray transition-all"}`}
        onClick={(e) => handleClick(e)}
      >
        Yearly
      </button>
    </div>
  )
}
