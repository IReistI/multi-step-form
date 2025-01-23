import { SubmitHandler, useForm } from "react-hook-form";
import HeaderStep from "./HeaderStep"
import { useStep } from "../hooks/useStep";

interface Step1Data {
  name: string;
  email: string;
  phone: string;
}

interface Step1Props {
  onNext: () => void
}

export default function Step1({onNext} : Step1Props) {
  const {state, dispatch} = useStep() 

  const {register, handleSubmit, formState: { errors }} = useForm<Step1Data>({
    defaultValues: state.stepForm_1
  })

  const onSubmit: SubmitHandler<Step1Data> = (data) => {
    dispatch({type: 'UPDATE-STEP-1', payload: data})
    onNext()
  }

  return (
    <>
      <HeaderStep title="Personal info" subtitle="Please provide your name, email address, and your phone number" />
      <form className="space-y-3 1xl:space-y-6 mt-4 1xl:mt-6" onSubmit={handleSubmit(onSubmit)} id="form_1">
        <div className="flex flex-col 1xl:gap-2 relative">
          <label
            className="text-primary-marine-blue font-medium text-sm relative"
            htmlFor="name"
          >Name</label>
          {errors.name && <p className="absolute right-0 text-primary-strawberry-red text-sm font-bold">{errors.name?.message}</p>}
          <input
            className="input-step-1"
            style={{ borderColor: errors.name ? "hsl(354, 84%, 57%)" : ""}}
            id="name"
            autoComplete="on"
            type="text"
            placeholder="e.g. Stephen King"
            {...register("name", { required: "This Field is Required" })}
          />
        </div>
        <div className="flex flex-col 1xl:gap-2 relative">
          <label
            className="text-primary-marine-blue font-medium text-sm relative"
            htmlFor="email"
          >Email Address</label>
          {errors.email && <p className="absolute right-0 text-primary-strawberry-red text-sm font-bold">{errors.email?.message}</p>}
          <input
            className="input-step-1"
            style={{ borderColor: errors.email ? "hsl(354, 84%, 57%)" : ""}}
            id="email"
            autoComplete="on"
            type="email"
            placeholder="e.g. sthepenking@lorem.com"
            {...register("email", {
              required: "This Field is Required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
        </div>
        <div className="flex flex-col 1xl:gap-2 relative">
          <label
            className="text-primary-marine-blue font-medium text-sm relative"
            htmlFor="phone"
          >Phone Number</label>
          {errors.phone && <p className="absolute right-0 text-primary-strawberry-red text-sm font-bold">{errors.phone?.message}</p>}
          <input
            className="input-step-1"
            style={{ borderColor: errors.phone ? "hsl(354, 84%, 57%)" : ""}}
            id="phone"
            autoComplete="on"
            type="tel"
            placeholder="e.g. +1 234 567 890"
            {...register("phone", {
              required: "This Field is Required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Invalid phone number format",
              },
              minLength: {
                value: 10,
                message: "Only 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Only 10 digits",
              },
            })}
          />
        </div>
      </form>
    </>
  )
}
