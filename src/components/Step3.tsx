import { useState, useEffect } from "react";
import { useStep } from "../hooks/useStep";
import HeaderStep from "./HeaderStep";
import type { Step3 } from "../types";

interface Step3Props {
  onNext: () => void
}

export default function Step3({onNext} : Step3Props) {
  const { state, dispatch, formatPaymentType } = useStep()
  
  const [step3FormObj] = useState<{ [key: string]: number }>({
    service: state.type === "Monthly" ? 1 : 10,
    storage: state.type === "Monthly" ? 2 : 20,
    profile: state.type === "Monthly" ? 2 : 20,
  })

  useEffect(() => {
    if (state.stepForm_3.length < 1) return
    const updateSelections = state.stepForm_3.map(item => {
      if(step3FormObj[item.name] !== undefined) {
        return {
          ...item,
          value: step3FormObj[item.name],
        }
      }
      return item
    })
    dispatch({type: 'UPDATE-STEP-3-WITH-NEW-VALUES', payload: updateSelections})
  }, [state.type])

  const handleChange = (option: Step3) => {
    const exists = state.stepForm_3.some(op => op.name === option.name)
    dispatch({type: 'UPDATE-STEP-3', payload: exists ? {name: option.name, value: option.value, isRemove: true} : option})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.stepForm_3.length === 0) {
      alert("Please select at least one")
      return
    }
    onNext()
  };

  return (
    <>
      <HeaderStep title="Pick add-ons" subtitle="Add-ons help enhance your gaming experience." />
      <form id="form_3" className="space-y-3 1xl:space-y-6 mt-4 1xl:mt-8 1xl:w-[31rem]" onSubmit={(e) => handleSubmit(e)}>
        <label
          htmlFor="service"
          className={`flex justify-between items-center border px-4 1xl:px-6 py-2 1xl:py-4 rounded-lg cursor-pointer hover:border hover:border-primary-purplish-blue transition-all ${state.stepForm_3.some((step) => step.name === "service") && "border-primary-purplish-blue bg-neutral-magnolia"}`}
          onChange={() => handleChange({name: "service", value: step3FormObj.service})}
        >
          <input
            type="checkbox"
            id="service"
            className="size-5 accent-primary-purplish-blue border border-primary-pastel-blue rounded-sm"
            defaultChecked={state.stepForm_3.some((step) => step.name === "service")}
          />
          <h2 className="text-base font-bold text-primary-marine-blue 1xl:basis-[73%]">Online Service <span className="block text-sm font-normal text-neutral-cool-gray">Access to multiplayer games</span></h2>
          <p className="text-primary-purplish-blue font-normal text-sm">+${formatPaymentType(state.type, step3FormObj.service)}</p>
        </label>

        <label
          htmlFor="storage"
          className={`flex justify-between items-center border px-4 1xl:px-6 py-2 1xl:py-4 rounded-lg cursor-pointer hover:border hover:border-primary-purplish-blue transition-all ${state.stepForm_3.some((step) => step.name === "storage") && "border-primary-purplish-blue bg-neutral-magnolia"}`}
          onChange={() => handleChange({name: "storage", value: step3FormObj.storage})}
        >
          <input
            type="checkbox"
            id="storage"
            className="size-5 accent-primary-purplish-blue border border-primary-pastel-blue rounded-sm"
            defaultChecked={state.stepForm_3.some((step) => step.name === "storage")}
          />
          <h2 className="text-base font-bold text-primary-marine-blue 1xl:basis-[73%]">Large Storage <span className="block text-sm font-normal text-neutral-cool-gray">Extra 1TB of cloud save</span></h2>
          <p className="text-primary-purplish-blue font-normal text-sm">+${formatPaymentType(state.type, step3FormObj.storage)}</p>
        </label>

        <label
          htmlFor="profile"
          className={`flex justify-between items-center border px-4 1xl:px-6 py-2 1xl:py-4 rounded-lg cursor-pointer hover:border hover:border-primary-purplish-blue transition-all ${state.stepForm_3.some((step) => step.name === "profile") && "border-primary-purplish-blue bg-neutral-magnolia"}`}
          onChange={() => handleChange({name: "profile", value: step3FormObj.profile})}
        >
          <input
            type="checkbox"
            id="profile"
            className="size-5 accent-primary-purplish-blue border border-primary-pastel-blue rounded-sm"
            defaultChecked={state.stepForm_3.some((step) => step.name === "profile")}
          />
          <h2 className="text-base font-bold text-primary-marine-blue 1xl:basis-[73%]">Customizable Profile<span className="block text-sm font-normal text-neutral-cool-gray">Custom theme on your profile</span></h2>
          <p className="text-primary-purplish-blue font-normal text-sm">+${formatPaymentType(state.type, step3FormObj.profile)}</p>
        </label>
      </form>
    </>
  )
}
