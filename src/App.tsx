import { useState } from "react"
import List from "./components/List"
import Step1 from "./components/Step1"
import Step2 from "./components/Step2"
import Step3 from "./components/Step3"
import Step4 from "./components/Step4"
import Step5 from "./components/Step5"

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const STEPS = [Step1, Step2, Step3, Step4, Step5]

  let idForm = `form_${currentStep + 1}`

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }

  const CurrentStepComponent = STEPS[currentStep]

  return (
    <main className="bg-neutral-magnolia h-screen 1xl:flex font-ubuntu">
      <div className="w-full max-w-96 1xl:max-w-5xl mx-auto 1xl:m-auto 1xl:flex 1xl:justify-between 1xl:bg-neutral-white 1xl:p-4 1xl:h-[43rem] 1xl:rounded-lg 1xl:shadow">
        <div className="bg-mobile-sidebar 1xl:bg-desktop-sidebar h-44 1xl:h-auto bg-no-repeat bg-cover flex justify-center 1xl:justify-start py-5 1xl:pt-10 1xl:pl-10 1xl:pr-24 1xl:pb-0 1xl:rounded-lg">
          <ul className="flex gap-3 1xl:gap-6 1xl:flex-col">
            {STEPS.slice(0, -1).map((_, index) => (
              currentStep <= 4 &&
              <List
                key={index}
                currentStep={currentStep}
                step={Number(index + 1)}
              />
            ))}
          </ul>
        </div>
        <div className="1xl:flex 1xl:pt-8 1xl:pr-20 1xl:pb-4 1xl:flex-col 1xl:justify-between">
          <div className="p-6 1xl:p-0 max-w-[22rem] 1xl:max-w-full bg-neutral-white rounded-lg mx-auto -mt-20 1xl:m-0">
            <CurrentStepComponent onNext={handleNextStep} />
          </div>
          {currentStep <= 3 && (
            <div className={`bg-neutral-white flex p-4 1xl:p-0 mt-10 ${currentStep > 0 ? 'justify-between' : 'justify-end'}`}>
              {currentStep > 0 && (
                <button
                  className="text-neutral-cool-gray font-bold hover:text-primary-marine-blue transition"
                  onClick={handleBackStep}
                >
                  Go Back
                </button>
              )}
              <button
                type="submit"
                form={idForm}
                className={`py-2 px-4 1xl:text-lg 1xl:px-6 text-neutral-white bg-primary-marine-blue rounded-md hover:brightness-150 transition ${currentStep === 3 && 'bg-primary-purplish-blue px-6 hover:opacity-80'}`}
              >
                {currentStep === 3 ? 'Confirm' : 'Next Step'}
              </button>
            </div>
          )}
        </div>
      </div>
    </main> 
  )
}

export default App
