import { ReactNode } from "react"

type StepFormProps = {
  children: ReactNode
}

export default function StepForm({children} : StepFormProps) {
  return (
    <form className="space-y-3 mt-4">
      {children}
    </form>
  )
}
