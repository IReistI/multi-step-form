import { useStep } from "../hooks/useStep"
import { useForm } from "react-hook-form"
import HeaderStep from "./HeaderStep"
import ToggleSwitch from "./ToggleSwitch"
import { useEffect, useState } from "react"

export type FormData = {
  select: string
}

interface Step2Props {
  onNext: () => void
}

export default function Step2({ onNext }: Step2Props) {
  const { state, dispatch, formatPaymentType } = useStep()
  const [selected, setSelected] = useState<String>(state.stepForm_2.option)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  let options = [
    {
      option: "arcade",
      billing: state.type === "Monthly" ? 9 : 90
    },
    {
      option: "advanced",
      billing: state.type === "Monthly" ? 12 : 120
    },
    {
      option: "pro",
      billing: state.type === "Monthly" ? 15 : 150
    }
  ]

  useEffect(() => {
    options = [
      {
        option: "arcade",
        billing: state.type === "Monthly" ? 9 : 90
      },
      {
        option: "advanced",
        billing: state.type === "Monthly" ? 12 : 120
      },
      {
        option: "pro",
        billing: state.type === "Monthly" ? 15 : 150
      }
    ]
    const newValuesObj = options.find(option => option.option === selected)
    if (newValuesObj) {
      dispatch({ type: 'UPDATE-STEP-2', payload: newValuesObj })
    }
  }, [state.type])

  const handleClickOption = (option: string, billing: number) => {
    setSelected(option)
    dispatch({ type: 'UPDATE-STEP-2', payload: { option, billing } })
  }

  const onSubmit = () => {
    onNext()
  };

  return (
    <>
      <HeaderStep title="Select your plan" subtitle="You have the option of monthly or yearly billing." />
      {errors.select?.message && <p className="text-red-500 text-lg text-center uppercase transition-all mt-1">{errors.select.message}</p>}

      <form id="form_2" className="mt-4 1xl:mt-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="1xl:flex 1xl:gap-8 1xl:justify-between space-y-3 1xl:space-y-0">
          <label
            tabIndex={0}
            className={`flex 1xl:flex-col items-center 1xl:items-start gap-3 1xl:gap-16 border p-3 1xl:p-4 1xl:w-36 rounded-lg cursor-pointer hover:border-primary-purplish-blue transition-all ${selected === options[0].option && 'bg-neutral-magnolia border-primary-purplish-blue'}`}
            htmlFor="arcade"
            onClick={() => handleClickOption(options[0].option, options[0].billing)}
          >
            <img className="self-start mt-1 1xl:m-0 aspect-square" src="icons/icon-arcade.svg" alt="icon arcade" />
            <div>
              <h2 className="font-bold text-primary-marine-blue">Arcade</h2>
              <p className="text-neutral-cool-gray">${formatPaymentType(state.type, options[0].billing)}</p>
              <p className="text-primary-marine-blue font-regular text-sm">{state.type === 'Yearly' && '2 months free'}</p>
            </div>
            <input
              className="hidden"
              type="radio"
              id="arcade"
              {...register("select", { required: "Please select an option" })}
              defaultChecked={state.stepForm_2.option === 'arcade'}
            />
          </label>
          <label
            tabIndex={0}
            className={`flex 1xl:flex-col items-center 1xl:items-start gap-3 1xl:gap-16 border p-3 1xl:p-4 1xl:w-36 rounded-lg cursor-pointer hover:border-primary-purplish-blue transition-all ${selected === options[1].option && 'bg-neutral-magnolia border-primary-purplish-blue'}`}
            htmlFor="advanced"
            onClick={() => handleClickOption(options[1].option, options[1].billing)}
          >
            <img className="self-start mt-1 1xl:m-0 aspect-square" src="icons/icon-advanced.svg" alt="icon advanced" />
            <div>
              <h2 className="font-bold text-primary-marine-blue">Advanced</h2>
              <p className="text-neutral-cool-gray">${formatPaymentType(state.type, options[1].billing)}</p>
              <p className="text-primary-marine-blue font-regular text-sm">{state.type === 'Yearly' && '2 months free'}</p>
            </div>
            <input
              className="hidden"
              type="radio"
              id="advanced"
              {...register("select", { required: "Please select an option" })}
              defaultChecked={state.stepForm_2.option === 'advanced'}
            />
          </label>
          <label
            tabIndex={0}
            className={`flex 1xl:flex-col items-center 1xl:items-start gap-3 1xl:gap-16 border p-3 1xl:p-4 1xl:w-36 rounded-lg cursor-pointer hover:border-primary-purplish-blue transition-all ${selected === options[2].option && 'bg-neutral-magnolia border-primary-purplish-blue'}`}
            htmlFor="pro"
            onClick={() => handleClickOption(options[2].option, options[2].billing)}
          >
            <img className="self-start mt-1 1xl:m-0 aspect-square" src="icons/icon-pro.svg" alt="icon pro" />
            <div>
              <h2 className="font-bold text-primary-marine-blue">Pro</h2>
              <p className="text-neutral-cool-gray">${formatPaymentType(state.type, options[2].billing)}</p>
              <p className="text-primary-marine-blue font-regular text-sm">{state.type === 'Yearly' && '2 months free'}</p>
            </div>
            <input
              className="hidden"
              type="radio"
              id="pro"
              {...register("select", { required: "Please select an option" })}
              defaultChecked={state.stepForm_2.option === 'pro'}
            />
          </label>
        </div>
        <ToggleSwitch />
      </form>
    </>
  )
}