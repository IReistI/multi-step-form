import { useEffect, useState } from "react";
import { useStep } from "../hooks/useStep";
import HeaderStep from "./HeaderStep";

interface Step4Props {
  onNext: () => void
}

export default function Step4({ onNext }: Step4Props) {
  const { state, dispatch, formatPaymentType, calculateTotalAmount } = useStep()
  const [ totalAmount, setTotalAmount ] = useState(0)

  useEffect(() => {
    const totalAddonsValues = state.stepForm_3.reduce((acm, addOn) => acm + addOn.value, 0)
    setTotalAmount(calculateTotalAmount(state.stepForm_2.billing, totalAddonsValues))
  }, [state.type])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.entries(state.stepForm_1).find(input => input.includes("")) ||
        Object.entries(state.stepForm_2).find(option => option.includes("")) ||
        state.stepForm_3.length === 0) {
      alert("All forms are required!")
      return
    }
    onNext() 
  }

  const handleClick = () => {
    dispatch({type: 'UPDATE-TYPE', payload: state.type === 'Monthly' ? 'Yearly' : 'Monthly'})
    dispatch({type: 'UPDATE-ALL-WITH-NEW-VALUES'})
  }

  return (
    <>
      <HeaderStep title="Finishing Up" subtitle="Double-check everything looks OK before confirming." />
      <form id="form_4" className="hidden" onSubmit={e => handleSubmit(e)}></form>
      <div className="space-y-3 mt-4 1xl:mt-6 p-4 1xl:p-6 bg-neutral-alabaster 1xl:w-[31rem]">
        <div className="flex justify-between items-center pb-2 1xl:pb-6 border-b-2">
          <div>
            <p className="first-letter:uppercase text-primary-marine-blue font-bold">{state.stepForm_2.option}<span className="ml-1">({state.type})</span></p>
            <button
              className="text-neutral-cool-gray underline decoration-2 hover:text-primary-purplish-blue transition"
              onClick={handleClick}
            >Change</button>
          </div>
          <p className="text-primary-marine-blue font-bold">${formatPaymentType(state.type, state.stepForm_2.billing)}</p>
        </div>
        {state.stepForm_3.map(option => (
          <div key={option.name} className="flex justify-between 1xl:py-1">
            <p className="first-letter:uppercase text-neutral-cool-gray">{option.name}</p>
            <p className="first-letter:uppercase text-primary-marine-blue font-medium tracking-wide">+${formatPaymentType(state.type, option.value)}</p>
          </div>
        ))}
      </div>
      <div className="p-4 1xl:p-6 flex justify-between items-center">
        <p className="text-neutral-cool-gray">Total ({state.type === "Monthly" ? 'per month' : 'per year'})</p>
        <p className="text-primary-purplish-blue font-bold text-lg">${formatPaymentType(state.type, totalAmount)}</p>
      </div>
    </>
  )
}
