type HeaderStepProps = {
  title: string
  subtitle: string
}

export default function HeaderStep({title, subtitle} : HeaderStepProps) {
  return (
    <>
      <h1 className="font-bold text-primary-marine-blue text-2xl 1xl:text-3xl mb-2">{title}</h1>
      <h2 className="font-normal text-neutral-cool-gray">{subtitle}</h2>
    </>
  )
}
