type ListTypeProps = {
  step: number
  currentStep: number
}

const dataStep = [
  {
    value: "your info"
  },
  {
    value: "select plan"
  },
  {
    value: "add-ons"
  },
  {
    value: "summary"
  }
]

export default function List({ step, currentStep }: ListTypeProps) {
  return (
    <li className="flex 1xl:gap-4 1xl:items-center">
      <span className={`size-10 rounded-full font-bold flex items-center justify-center ${currentStep + 1 === step ? "text-primary-marine-blue bg-primary-light-blue" : "text-neutral-magnolia bg-transparent border"}`}>{step}</span>
      <div className="1xl:flex 1xl:flex-col 1xl:uppercase">
        <span className="hidden 1xl:block 1xl:font-normal text-sm text-neutral-cool-gray">step {step}</span>
        <span className="hidden 1xl:block 1xl:font-bold text-neutral-magnolia 1xl:tracking-widest">{dataStep[step - 1].value}</span>
      </div>
    </li>
  )
}
